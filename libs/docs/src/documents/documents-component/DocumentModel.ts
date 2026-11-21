import { computed, signal } from '@angular/core';
import { DocumentMetadata, DocumentModelConfig, DocumentState } from './documents.types';

/** Możliwe przejścia
 * NEW -> ADDING lub NEW -> usunięcie
 * ADDING -> ADDING_FAILED lub ADDING -> DEFAULT
 * ADDING_FAILED -> ADDING lub ADDING_FAILED -> usunięcie (tak samo jak NEW)
 * DEFAULT -> MARKED_FOR_DELETE
 * MARKED_FOR_DELETE -> DELETING lub MARKED_FOR_DELETE -> DEFAULT (undo)
 * DELETING -> DELETE_FAILED lub DELETING -> usunięcie
 * DELETE_FAILED -> DELETING lub DELETE_FAILED -> DEFAULT (undo) jak w MARKED_FOR_DELETE, lub DELETE_FAILED -> usunięcie (force delete)
 */

export class DocumentModel {
  readonly localId: string;
  readonly state = signal<DocumentState>('NEW');
  readonly metadata = signal<DocumentMetadata>({} as DocumentMetadata);
  readonly file = signal<File | undefined>(undefined);

  readonly isToDelete = computed(() => ['MARKED_FOR_DELETE', 'DELETE_FAILED'].includes(this.state()));
  readonly isToAdd = computed(() => ['NEW', 'ADDING_FAILED'].includes(this.state()));
  readonly isPending = computed(() => this.isToAdd() || this.isToDelete());
  readonly isOnlyLocal = this.isToAdd;
  readonly isActive = computed(() => ['NEW', 'ADDING', 'ADDING_FAILED', 'DEFAULT'].includes(this.state())); // czy jest nadal aktualny z perspektywy stanu formularza, traktując odroczone operacje jakby się wykonaly - jeśli ma być usunięty to tu już dokument nie jest uwzględniany, jeśli ma być dodany to już jest uznawany

  constructor({ initialState = 'NEW', metadata, file }: DocumentModelConfig) {
    this.localId = crypto.randomUUID();
    this.state.set(initialState);
    this.metadata.set(metadata);
    this.file.set(file);
  }

  updateMetadata(newMetadata: Partial<DocumentMetadata>) {
    this.metadata.update((current) => ({ ...current, ...newMetadata }));
  }

  updateFile(newFile?: File) {
    this.file.set(newFile);
  }

  startAdding(): void {
    this.transitionTo('ADDING', ['NEW', 'ADDING_FAILED']);
  }

  completeAdding(metadata: DocumentMetadata): void {
    this.transitionTo('DEFAULT', ['ADDING']);
    this.updateMetadata({ ...metadata });
    this.updateFile();
  }

  failAdding(): void {
    this.transitionTo('ADDING_FAILED', ['ADDING']);
  }

  markForDelete(): void {
    this.transitionTo('MARKED_FOR_DELETE', ['DEFAULT']);
  }

  undoDelete(): void {
    this.transitionTo('DEFAULT', ['MARKED_FOR_DELETE', 'DELETE_FAILED']);
  }

  startDeleting(): void {
    this.transitionTo('DELETING', ['DEFAULT', 'MARKED_FOR_DELETE', 'DELETE_FAILED']);
  }

  failDeleting(): void {
    this.transitionTo('DELETE_FAILED', ['DELETING']);
  }

  private transitionTo(nextState: DocumentState, allowedFrom: readonly DocumentState[]): void {
    const currentState = this.state();
    if (!allowedFrom.includes(currentState)) throw new Error(`Niedozwolona zmiana stanu dokumentu: ${currentState} → ${nextState}`);
    this.state.set(nextState);
  }
}
