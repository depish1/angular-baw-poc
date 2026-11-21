import { Component, signal, viewChildren } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { disabled, FormField, form, minLength } from '@angular/forms/signals';
import { Documents } from './documents.component';
import type { DocumentMetadata, Repository, SynchronizationMode } from './documents.types';
import { RepositoryFactory } from './RepositoryFactory';

const existingDocument: DocumentMetadata = {
  id: 'existing',
  fileName: 'existing.txt',
  mimeType: 'text/plain',
  size: 0,
  createDate: '',
  modifyDate: '',
  retentionDate: null,
};

@Component({
  imports: [Documents, FormField],
  template: `
    <app-documents [formField]="fields.first" [synchronizationMode]="mode()" />
    <app-documents [formField]="fields.second" synchronizationMode="DEFERRED" />
  `,
})
class TestHost {
  readonly locked = signal(false);
  readonly mode = signal<SynchronizationMode>('DEFERRED');
  readonly data = signal({
    first: [] as DocumentMetadata[],
    second: [existingDocument],
  });
  readonly fields = form(this.data, (path) => {
    minLength(path.first, 1);
    disabled(path.first, () => this.locked());
  });
  readonly controls = viewChildren(Documents);
}

describe('Documents in Signal Forms', () => {
  const upload = vi.fn<Repository['upload']>();
  const remove = vi.fn<Repository['remove']>();

  beforeEach(() => {
    upload.mockReset();
    remove.mockReset();
    TestBed.configureTestingModule({
      providers: [{ provide: RepositoryFactory, useValue: { get: () => ({ upload, remove }) } }],
    });
  });

  it('publishes a deferred file immediately and keeps its File until commit', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const host = fixture.componentInstance;
    const [first, second] = host.controls();
    const file = new File(['hello'], 'local.txt', { type: 'text/plain' });
    upload.mockResolvedValue({ ...existingDocument, id: 'uploaded', fileName: file.name });

    expect(host.fields.first().invalid()).toBe(true);
    await first.addFile(file);
    await fixture.whenStable();

    expect(host.fields.first().valid()).toBe(true);
    expect(host.data().first[0].id).toBeUndefined();
    expect(host.data().second).toEqual([existingDocument]);
    expect(first.isSynchronized()).toBe(false);
    expect(second.isSynchronized()).toBe(true);
    expect(upload).not.toHaveBeenCalled();

    await first.commit();
    expect(upload).toHaveBeenCalledExactlyOnceWith(file);
    expect(host.data().first[0].id).toBe('uploaded');
    expect(first.isSynchronized()).toBe(true);
  });

  it('maintains deferred deletes across form updates and supports undo and external replacement', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const host = fixture.componentInstance;
    const [, second] = host.controls();
    const localId = second.filteredDocuments()[0].localId;

    await second.removeDocument(localId);
    await fixture.whenStable();
    expect(host.data().second).toEqual([]);
    expect(second.isSynchronized()).toBe(false);

    second.undoDelete(localId);
    await fixture.whenStable();
    expect(host.data().second).toEqual([existingDocument]);
    expect(second.isSynchronized()).toBe(true);

    await second.removeDocument(localId);
    await fixture.whenStable();
    remove.mockResolvedValue(undefined);
    await second.commit();
    expect(remove).toHaveBeenCalledExactlyOnceWith('existing');

    host.fields.second().value.set([existingDocument]);
    await fixture.whenStable();
    expect(second.filteredDocuments()[0].metadata()).toEqual(existingDocument);
    expect(second.isSynchronized()).toBe(true);
  });

  it('keeps failed uploads pending and honours the disabled state from the form', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const host = fixture.componentInstance;
    const [first] = host.controls();
    const file = new File(['hello'], 'retry.txt');

    host.locked.set(true);
    await fixture.whenStable();
    await first.addFile(file);
    expect(host.data().first).toEqual([]);

    host.locked.set(false);
    await fixture.whenStable();
    await first.addFile(file);
    upload.mockRejectedValueOnce(new Error('API unavailable'));
    await expect(first.commit()).rejects.toThrow('Failed to synchronize 1 documents');
    expect(first.isSynchronized()).toBe(false);
    upload.mockResolvedValueOnce({ ...existingDocument, id: 'retry', fileName: file.name });
    await first.commit();
    expect(host.data().first[0].id).toBe('retry');
    expect(first.isSynchronized()).toBe(true);
  });

  it('uploads and deletes immediately while keeping the form value current', async () => {
    const fixture = TestBed.createComponent(TestHost);
    const host = fixture.componentInstance;
    host.mode.set('IMMEDIATE');
    await fixture.whenStable();
    const [first] = host.controls();
    const file = new File(['hello'], 'immediate.txt');
    upload.mockResolvedValue({ ...existingDocument, id: 'immediate', fileName: file.name });
    remove.mockResolvedValue(undefined);

    await first.addFile(file);
    await fixture.whenStable();
    expect(upload).toHaveBeenCalledExactlyOnceWith(file);
    expect(host.data().first[0].id).toBe('immediate');

    await first.removeDocument(first.filteredDocuments()[0].localId);
    expect(remove).toHaveBeenCalledExactlyOnceWith('immediate');
    expect(host.data().first).toEqual([]);
    expect(first.isSynchronized()).toBe(true);
  });
});
