import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Injector, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { form, FormField, validate } from '@angular/forms/signals';
import { DocumentMetadata, RepositoryType, SynchronizationMode } from '../documents-component/documents.types';
import { Documents } from '../documents-component/documents.component';

export interface DocumentsElementOptions {
  initialData?: DocumentMetadata[];
  onChange?: (data: DocumentMetadata[]) => void;
  repository?: RepositoryType;
  synchronizationMode?: SynchronizationMode;
  title?: string;
}

export function copyDocuments(data: DocumentMetadata[]): DocumentMetadata[] {
  return data.map((document) => ({ ...document }));
}

interface DocumentsElementHost {
  options: DocumentsElementOptions;
  onReady: (adapter: DocumentsElementAdapter) => void;
  onDestroyed: (adapter: DocumentsElementAdapter) => void;
}

// Internal communication channel. The host cannot access Angular state through an element input.
const elementHosts = new WeakMap<HTMLElement, DocumentsElementHost>();

export function bindDocumentsElementHost(element: HTMLElement, host: DocumentsElementHost): void {
  elementHosts.set(element, host);
}

export function unbindDocumentsElementHost(element: HTMLElement): void {
  elementHosts.delete(element);
}

@Component({
  selector: 'app-documents-element-adapter',
  imports: [Documents, FormField],
  template: `
    <app-documents
      [formField]="field.documents"
      [repositoryType]="options.repository ?? 'A'"
      [synchronizationMode]="options.synchronizationMode ?? 'IMMEDIATE'"
      [title]="options.title ?? 'Dokumenty'"
      (valueChange)="notifyChange($event)"
    />
  `,
})
export class DocumentsElementAdapter implements OnInit, AfterViewInit, OnDestroy {
  readonly documents = viewChild.required(Documents);
  private readonly hostElement = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly injector = inject(Injector);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly data = signal({ documents: [] as DocumentMetadata[] });
  private readonly validation = signal<{ valid: boolean; message?: string }>({ valid: true });
  private host!: DocumentsElementHost;
  private committing = false;
  protected options: DocumentsElementOptions = {};
  protected field!: ReturnType<typeof form<{ documents: DocumentMetadata[] }>>;

  ngOnInit(): void {
    const host = elementHosts.get(this.hostElement);
    if (!host) throw new Error('Call init() on the documents element first.');

    this.host = host;
    this.options = host.options;
    this.data.set({ documents: copyDocuments(host.options.initialData ?? []) });
    this.field = form(
      this.data,
      (path) => {
        validate(path.documents, () => {
          const { valid, message } = this.validation();
          return valid ? undefined : { kind: 'baw', message };
        });
      },
      { injector: this.injector },
    );
  }

  ngAfterViewInit(): void {
    this.host.onReady(this);
  }

  ngOnDestroy(): void {
    this.host?.onDestroyed(this);
  }

  setData(documents: DocumentMetadata[]): void {
    if (this.committing) throw new Error('Cannot replace documents during commit.');

    const replacement = copyDocuments(documents);
    this.data.set({ documents: replacement });
    this.applyReplacement();
    this.notifyChange(replacement);
  }

  getData(): DocumentMetadata[] {
    return copyDocuments(this.data().documents);
  }

  get isValid(): boolean {
    return this.validation().valid;
  }

  setValid(isValid: boolean, errMsg?: string): void {
    this.validation.set({ valid: isValid, message: isValid ? undefined : errMsg });
  }

  get isSynchronized(): boolean {
    return this.documents().isSynchronized();
  }

  async commit(): Promise<void> {
    if (this.committing) throw new Error('Commit already in progress.');

    this.committing = true;
    try {
      await this.documents().commit();
    } finally {
      this.committing = false;
    }
  }

  protected notifyChange(data: DocumentMetadata[]): void {
    const callback = this.options.onChange;
    if (!callback) return;

    const snapshot = copyDocuments(data);
    // Let FormField finish publishing the value before the host reads it back.
    queueMicrotask(() => callback(snapshot));
  }

  private applyReplacement(): void {
    // Deliver the new input before an old upload's Promise can publish its result.
    this.changeDetector.detectChanges();
  }
}
