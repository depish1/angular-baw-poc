import { Component, input, model, viewChild } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { UiCheckboxGroup, type GroupOrientation } from '../checkbox-group/checkbox-group';
import { UiLabel } from '../label/label';
import { UiError } from '../error/error';

let nextGroupId = 0;

@Component({
  selector: 'ui-form-field-checkbox-group',
  imports: [UiCheckboxGroup, UiLabel, UiError],
  template: `
    <ui-label [id]="labelId">{{ label() }}</ui-label>
    <ui-checkbox-group [labelledBy]="labelId" [options]="options()" [labelKey]="labelKey()"
      [valueKey]="valueKey()" [orientation]="orientation()" [value]="value()"
      [disabled]="disabled()" [invalid]="invalid()" [touched]="touched()"
      (valueChange)="value.set($event)" (touchedChange)="touched.set($event)" />
    @if (showError()) { <ui-error [message]="errorMessage()" /> }
  `,
})
export class UiFormFieldCheckboxGroup<T extends object> implements FormValueControl<T[]> {
  readonly label = input.required<string>();
  readonly options = input<readonly T[]>([]);
  readonly labelKey = input.required<keyof T>();
  readonly valueKey = input.required<keyof T>();
  readonly orientation = input<GroupOrientation>('vertical');
  readonly value = model<T[]>([]);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  protected readonly labelId = `ui-checkbox-group-label-${++nextGroupId}`;
  private readonly control = viewChild(UiCheckboxGroup<T>);

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
