import { Component, input, model, viewChild } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { UiCheckbox } from '../checkbox/checkbox';
import { UiLabel } from '../label/label';
import { UiError } from '../error/error';

let nextCheckboxId = 0;

@Component({
  selector: 'ui-form-field-checkbox',
  imports: [UiCheckbox, UiLabel, UiError],
  template: `
    <ui-checkbox [id]="controlId" [value]="value()" [disabled]="disabled()"
      [invalid]="invalid()" [touched]="touched()" [describedBy]="showError() ? errorId : ''"
      (valueChange)="value.set($event)" (touchedChange)="touched.set($event)">
      <ui-label [for]="controlId">{{ label() }}</ui-label>
    </ui-checkbox>
    @if (showError()) { <ui-error [id]="errorId" [message]="errorMessage()" /> }
  `,
  styles: [`:host { display: block; } :host ui-label { margin: 0; font-weight: normal; }`],
})
export class UiFormFieldCheckbox implements FormValueControl<boolean> {
  readonly label = input.required<string>();
  readonly value = model(false);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  protected readonly controlId = `ui-checkbox-${++nextCheckboxId}`;
  protected readonly errorId = `${this.controlId}-error`;
  private readonly control = viewChild(UiCheckbox);

  protected showError(): boolean {
    return this.touched() && this.invalid() && this.errors().length > 0;
  }

  protected errorMessage(): string {
    return this.errors()[0]?.message ?? '';
  }

  focus(options?: FocusOptions): void {
    this.control()?.focus(options);
  }
}
