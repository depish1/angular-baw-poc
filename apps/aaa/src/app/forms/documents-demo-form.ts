import { Component, input, OnInit, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { Documents } from 'docs';
import type { DocumentMetadata } from 'docs';
import {
  UiAlert,
  UiButton,
  UiFormFieldCheckbox,
  UiFormFieldCheckboxGroup,
  UiFormFieldInput,
  UiFormFieldRadioGroup,
} from 'ui';
import type { FormBridge, FormInputs } from '../form-contract';

export interface Department {
  id: number;
  name: string;
}

export interface DocumentsDemoBinding {
  name: string;
  accepted: boolean;
  departments: Department[];
  mainDepartment: Department | null;
  documents: DocumentMetadata[];
}

export interface DocumentsDemoConfig {
  title: string;
  departments: Department[];
}

export type DocumentsDemoResult = DocumentsDemoBinding;

@Component({
  selector: 'aaa-documents-demo-form',
  imports: [
    FormField,
    UiAlert,
    UiButton,
    UiFormFieldInput,
    UiFormFieldCheckbox,
    UiFormFieldCheckboxGroup,
    UiFormFieldRadioGroup,
    Documents,
  ],
  template: `
    <h1>{{ config().title }}</h1>
    <form (submit)="finish($event)">
      <ui-form-field-input label="Imię" placeholder="Wprowadź imię" [formField]="fields.name" />
      <ui-form-field-checkbox label="Akceptuję warunki" [formField]="fields.accepted" />
      <ui-form-field-checkbox-group label="Działy" [options]="config().departments"
        labelKey="name" valueKey="id" [formField]="fields.departments" />
      <ui-form-field-radio-group label="Główny dział" [options]="config().departments"
        labelKey="name" valueKey="id" [formField]="fields.mainDepartment" />
      <app-documents [formField]="fields.documents" repositoryType="A"
        synchronizationMode="DEFERRED" title="Dokumenty" />

      @if (submitAttempted() && fields().invalid()) {
        <ui-alert variant="error">Uzupełnij wymagane pola i dodaj przynajmniej jeden dokument.</ui-alert>
      }

      <ui-button type="submit">Zakończ formularz</ui-button>
    </form>
    <h2>Dane formularza</h2>
    <pre>{{ preview() }}</pre>
  `,
  styles: [`
    :host { display: block; max-width: 900px; margin: auto; padding: 24px; }
    form { display: grid; gap: 16px; }
    pre { padding: 12px; background: var(--ui-color-surface-hover, #f3f4f6); overflow: auto; }
  `],
})
export class DocumentsDemoForm implements FormInputs<DocumentsDemoBinding, DocumentsDemoConfig, DocumentsDemoResult>, OnInit {
  readonly binding = input.required<DocumentsDemoBinding>();
  readonly config = input.required<DocumentsDemoConfig>();
  readonly bridge = input.required<FormBridge<DocumentsDemoResult>>();

  protected readonly submitAttempted = signal(false);
  private readonly data = signal<DocumentsDemoBinding>({
    name: '', accepted: false, departments: [], mainDepartment: null, documents: [],
  });

  protected readonly fields = form(this.data, (path) => {
    required(path.name, { message: 'Podaj imię.' });
    required(path.accepted, { message: 'Wymagana jest akceptacja warunków.' });
    minLength(path.departments, 1, { message: 'Wybierz przynajmniej jeden dział.' });
    required(path.mainDepartment, { message: 'Wybierz główny dział.' });
    minLength(path.documents, 1, { message: 'Dodaj przynajmniej jeden dokument.' });
  });

  ngOnInit(): void {
    const binding = this.binding();
    this.data.set({
      ...binding,
      departments: [...binding.departments],
      documents: binding.documents.map((document) => ({ ...document })),
    });
  }

  protected preview(): string {
    return JSON.stringify(this.data(), null, 2);
  }

  protected finish(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);
    this.fields().markAsTouched();
    if (this.fields().invalid()) return;
    this.bridge().complete(this.data());
  }
}
