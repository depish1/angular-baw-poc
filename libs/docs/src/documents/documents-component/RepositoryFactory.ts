import { inject, Injectable } from '@angular/core';
import { RepositoryAService } from './services/repository-a.service';
import { Repository, RepositoryType } from './documents.types';

@Injectable({ providedIn: 'root' })
export class RepositoryFactory {
  private readonly repositoryA = inject(RepositoryAService);

  get(type: RepositoryType): Repository {
    switch (type) {
      case 'A':
        return this.repositoryA;
      case 'B':
        return this.repositoryA; // Placeholder for RepositoryBService, which is not implemented yet
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}
