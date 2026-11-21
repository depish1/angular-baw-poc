import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DocumentMetadata, Repository } from '../documents.types';

export interface ApiDocumentMetadata {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  createDate: string;
  modifyDate: string;
  retentionDate: string | null;
  user?: string;
}

@Injectable({ providedIn: 'root' })
export class RepositoryAService implements Repository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/files';

  async download(id: string): Promise<Blob> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/${id}/download`, {
        responseType: 'blob',
      }),
    );
  }

  async upload(file: File): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await firstValueFrom(this.http.post<ApiDocumentMetadata>(this.baseUrl, formData));

    return {
      id: response.id,
      fileName: response.filename,
      mimeType: response.mimeType,
      size: response.size,
      createDate: response.createDate,
      modifyDate: response.modifyDate,
      retentionDate: response.retentionDate,
      user: response.user,
    };
  }

  async remove(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }
}
