export interface DocumentMetadata {
  id?: string;
  fileName: string;
  mimeType: string;
  size: number;
  createDate: string;
  modifyDate: string;
  retentionDate: string | null;
  user?: string;
}

export type DocumentState =
  | 'NEW' //lokalnie TAK, zdalnie NIE, można usunąć, wtedy obiekt znika z pamięci, lub dodać zdalnie, wtedy przejdzie w ADDING
  | 'ADDING' // lokalnie TAK zdalnie NIE, dodawanie w trakcie, jeśli zakończy się sukcesem dokument uzyska stan DEFAULT
  | 'ADDING_FAILED' //lokalnie TAK, zdalnie NIE, dodawanie zakończone blede, logicznie to samo co NEW, można ponowić , lub usunąć, wtedy obiekt zniknie z pamięci
  | 'DEFAULT' // lokalnie TAK, zdalnie TAK, można usunąć, wtedy przejdzie w MARK_FOR_DELETE
  | 'MARKED_FOR_DELETE' // lokalnie NIE, zdalnie TAK, odroczone usunięcie, można cofnąć (wraca do DEFAULT lub usunąć (DELETING)
  | 'DELETING' // lokalnie NIE, zdalnie TAK, usuwanie w trakcie
  | 'DELETE_FAILED'; // lokalnie NIE, zdalnie TAK, stan po bledzie usuwania, można cofnąć albo ponowić, logicznie tożsamyz MARKED_FOR_DELETE, być może tylko wizualnie będzie inaczej oznaczony, pytanie czy wyodrębniać oddzielny stan

export type DocumentModelConfig = {
  initialState?: DocumentState;
  metadata: DocumentMetadata;
  file?: File;
};
export interface Repository {
  upload(file: File): Promise<DocumentMetadata>;
  download(id: string): Promise<Blob>;
  remove(id: string): Promise<void>;
}

export type RepositoryType = 'A' | 'B';

export type SynchronizationMode = 'IMMEDIATE' | 'DEFERRED';
