import { Injectable } from '@angular/core';

@Injectable()
export class FileDownloadService {
  private url: string | null = null;

  ngOnDestroy(): void {
    this.releaseUrl();
  }

  save(blob: Blob, fileName: string): void {
    if (!!this.url) URL.revokeObjectURL(this.url);
    this.url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = this.url;
    link.download = fileName;
    link.click();
  }

  private releaseUrl(): void {
    if (!this.url) return;

    URL.revokeObjectURL(this.url);
    this.url = null;
  }
}
