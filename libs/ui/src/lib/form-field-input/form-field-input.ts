import { Component, input, model, viewChild } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { UiInput, type InputSize, type InputType } from '../input/input';
import { UiLabel } from '../label/label';
import { UiError } from '../error/error';

let nextInputId = 0;

@Component({
  selector: 'ui-form-field-input',
  imports: [UiLabel, UiInput, UiError],
  template: `
    <ui-label [for]="controlId">{{ label() }}</ui-label>
    <ui-input [id]="controlId" [type]="type()" [size]="size()" [placeholder]="placeholder()"
      [disabled]="disabled()" [readonly]="readonly()" [invalid]="invalid()"
      [describedBy]="showError() ? errorId : ''" [value]="value()" [touched]="touched()"
      (valueChange)="value.set($event)" (touchedChange)="touched.set($event)" />
    @if (showError()) { <ui-error [id]="errorId" [message]="errorMessage()" /> }
  `,
})
export class UiFormFieldInput implements FormValueControl<string> {
  readonly label = input.required<string>();
  readonly value = model('');
  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('default');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  protected readonly controlId = `ui-input-${++nextInputId}`;
  protected readonly errorId = `${this.controlId}-error`;
  private readonly control = viewChild(UiInput);

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
