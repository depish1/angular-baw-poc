import { Injectable, computed, signal } from '@angular/core';
import { DocumentMetadata } from '../documents.types';
import { DocumentModel } from '../DocumentModel';

@Injectable()
export class DocumentsStore {
  private readonly _documents = signal<DocumentModel[]>([]);
  readonly documents = this._documents.asReadonly();

  readonly data = computed(() =>
    this.documents()
      .filter((document) => document.isActive())
      .map((document) => ({ ...document.metadata() })),
  );

  replace(documents: DocumentMetadata[]): void {
    this._documents.set(
      documents.map((metadata) => new DocumentModel({ initialState: 'DEFAULT', metadata: { ...metadata } })),
    );
  }

  getDocumentByLocalId(localId: string) {
    return this.documents().find((document) => document.localId === localId);
  }

  add(file: File): DocumentModel {
    const now = new Date().toISOString();
    const metadata: DocumentMetadata = {
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      createDate: now,
      modifyDate: now,
      retentionDate: null,
    };
    const newDocument = new DocumentModel({ initialState: 'NEW', metadata, file });
    this._documents.update((current) => [...current, newDocument]);

    return newDocument;
  }

  remove(localId: string) {
    this._documents.update((current) => [...current.filter((el) => el.localId !== localId)]);
  }
}
