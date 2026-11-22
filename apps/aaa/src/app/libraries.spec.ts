import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form } from '@angular/forms/signals';
import { Documents } from 'docs';
import type { DocumentMetadata } from 'docs';
import { UiButton, UiInput } from 'ui';
import { describe, expect, it } from 'vitest';

@Component({
  imports: [UiButton, UiInput, Documents, FormField],
  template: `
    <ui-button>Wyślij</ui-button>
    <ui-input [(value)]="search" />
    <app-documents [formField]="fields.documents" repositoryType="A" />
  `,
})
class LibrariesHost {
  readonly search = signal('');
  readonly data = signal({ documents: [] as DocumentMetadata[] });
  readonly fields = form(this.data);
}

describe('zgodność paczek ui i docs z Angular 22 w aaa', () => {
  it('renderuje komponenty obu paczek na tym samym runtime Angular', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    const fixture = TestBed.createComponent(LibrariesHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ui-button button')?.textContent).toContain('Wyślij');
    expect(fixture.nativeElement.querySelector('ui-input input')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('app-documents table')).not.toBeNull();
  });
});
