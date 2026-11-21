import { Component, computed, effect, ElementRef, inject, input, model, output, signal, untracked } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { DocumentMetadata, RepositoryType, SynchronizationMode, Repository } from './documents.types';
import { RepositoryFactory } from './RepositoryFactory';
import { FileDownloadService } from './services/file-download.service';
import { DocumentsStore } from './services/documents-store.service';

@Component({
  imports: [],
  providers: [DocumentsStore, FileDownloadService],
  selector: 'app-documents',
  host: { '(focusout)': 'handleFocusOut($event)' },
  styleUrl: './documents.css',
  templateUrl: './documents.html',
})
export class Documents implements FormValueControl<DocumentMetadata[]> {
  readonly value = model<DocumentMetadata[]>([]);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touch = output<void>();
  readonly repositoryType = input<RepositoryType>('A');
  readonly synchronizationMode = input<SynchronizationMode>('IMMEDIATE');
  readonly title = input<string>('');

  protected readonly store = inject(DocumentsStore);
  private readonly repositoryFactory = inject(RepositoryFactory);
  private readonly fileDownloadService = inject(FileDownloadService);

  protected formatDate(date: string): string {
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Europe/Warsaw',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).format(new Date(date));
  }

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private appliedValue?: DocumentMetadata[];
  private externalRevision = 0;
  readonly searchQuery = signal('');
  private readonly committing = signal(false);
  protected readonly actionsDisabled = computed(() => this.disabled() || this.committing());

  readonly isSynchronized = computed(() => this.store.documents().every((document) => document.state() === 'DEFAULT'));

  private readonly activeRepository = computed(() => this.repositoryFactory.get(this.repositoryType()));

  readonly filteredDocuments = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    return this.store.documents().filter((document) => document.metadata().fileName.toLocaleLowerCase().includes(query));
  });

  constructor() {
    effect(() => {
      const value = this.value();
      untracked(() => this.applyFormValue(value));
    });
  }

  protected handleFocusOut(event: FocusEvent): void {
    if (!this.disabled() && !this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.touch.emit();
    }
  }

  private applyFormValue(value = this.value()): void {
    if (value === this.appliedValue) return;

    this.externalRevision++;
    this.appliedValue = value;
    this.store.replace(value);
  }

  private publishValue(): void {
    // Keep the store's Files and pending deletes when Signal Forms echoes this value.
    const value = this.store.data();
    this.appliedValue = value;
    this.value.set(value);
  }

  async downloadDocument(localId: string): Promise<void> {
    if (this.actionsDisabled()) return;
    this.applyFormValue();
    const document = this.store.getDocumentByLocalId(localId);
    if (!document) return;
    const file = document.file();
    const metadata = document.metadata();

    try {
      let blob: Blob;

      if (file) {
        blob = file;
      } else {
        if (!metadata.id) {
          throw new Error(`Missing repository ID for document ${localId}`);
        }

        const repository = this.activeRepository();
        blob = await repository.download(metadata.id);
      }

      this.fileDownloadService.save(blob, metadata.fileName);
    } catch (error) {
      console.error('Document download failed:', error);
    }
  }

  async uploadDocument(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (!file) return;

    try {
      await this.addFile(file);
    } catch (error) {
      console.error('Failed to add document:', error);
    } finally {
      input.value = '';
    }
  }

  undoDelete(localId: string): void {
    if (this.actionsDisabled()) return;
    this.applyFormValue();
    const document = this.store.getDocumentByLocalId(localId);
    if (!document?.isToDelete()) return;
    document.undoDelete();
    this.publishValue();
  }

  async removeDocument(localId: string): Promise<void> {
    if (this.actionsDisabled()) return;
    this.applyFormValue();
    const document = this.store.getDocumentByLocalId(localId);
    if (!document) return;

    if (document.isOnlyLocal()) {
      this.store.remove(document.localId);
    } else if (document.state() === 'DEFAULT') {
      document.markForDelete();
    } else {
      return;
    }

    this.publishValue();

    try {
      if (this.synchronizationMode() === 'IMMEDIATE' && document.isToDelete()) {
        await this.deleteDocumentRemotely(localId, this.activeRepository());
      }
    } catch (error) {
      console.error(`Delete failed, localId: ${document.localId}, ${error}`);
    }
  }

  async addFile(file: File): Promise<void> {
    if (this.actionsDisabled()) return;
    this.applyFormValue();
    const document = this.store.add(file);

    this.publishValue();
    try {
      if (this.synchronizationMode() === 'IMMEDIATE') {
        await this.addDocumentRemotely(document.localId, this.activeRepository());
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  async commit(): Promise<void> {
    if (this.committing()) throw new Error('Commit already in progress');
    if (this.disabled()) throw new Error('The documents field is disabled.');
    this.applyFormValue();
    const revision = this.externalRevision;

    this.committing.set(true);

    try {
      await this.synchronizePendingDocuments();
      this.applyFormValue();
      if (revision !== this.externalRevision) {
        throw new Error('The document list was replaced during synchronization.');
      }
    } finally {
      this.committing.set(false);
    }
  }

  private async synchronizePendingDocuments(): Promise<void> {
    const repository = this.activeRepository();

    const pending = this.store.documents().filter((document) => document.isPending());

    const results = await Promise.allSettled(
      pending.map(async (document) => {
        if (document.isToAdd()) return this.addDocumentRemotely(document.localId, repository);
        else if (document.isToDelete()) return this.deleteDocumentRemotely(document.localId, repository);

        throw new Error(`Cannot synchronize document ${document.localId} in state ${document.state()}`);
      }),
    );

    const failures = results.filter((result) => result.status === 'rejected');

    if (failures.length > 0) {
      throw new AggregateError(
        failures.map((result) => result.reason),
        `Failed to synchronize ${failures.length} documents`,
      );
    }
  }

  private async addDocumentRemotely(localId: string, repository: Repository): Promise<void> {
    const document = this.store.getDocumentByLocalId(localId);
    if (!document) throw new Error(`Cannot find document: ${localId}`);
    const file = document.file();
    if (!file) throw new Error(`Missing file for document ${localId}`);
    document.startAdding();

    try {
      const metadata = await repository.upload(file);
      this.applyFormValue();
      if (this.store.getDocumentByLocalId(localId) !== document) return;
      document.completeAdding(metadata);
      this.publishValue();
    } catch (error) {
      document.failAdding();
      throw error;
    }
  }

  private async deleteDocumentRemotely(localId: string, repository: Repository): Promise<void> {
    const document = this.store.getDocumentByLocalId(localId);
    if (!document) throw new Error(`Cannot find document: ${localId}`);
    const metadata = document.metadata();
    if (!metadata.id) throw new Error(`Missing repository ID for ${localId}`);
    document.startDeleting();

    try {
      await repository.remove(metadata.id);
      this.store.remove(document.localId);
    } catch (error) {
      document.failDeleting();
      throw error;
    }
  }
}
