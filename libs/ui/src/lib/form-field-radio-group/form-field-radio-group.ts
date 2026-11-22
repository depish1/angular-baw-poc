import { Component, input, model, viewChild } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { UiRadioGroup } from '../radio-group/radio-group';
import type { GroupOrientation } from '../checkbox-group/checkbox-group';
import { UiLabel } from '../label/label';
import { UiError } from '../error/error';

let nextRadioFieldId = 0;

@Component({
  selector: 'ui-form-field-radio-group',
  imports: [UiRadioGroup, UiLabel, UiError],
  template: `
    <ui-label [id]="labelId">{{ label() }}</ui-label>
    <ui-radio-group [labelledBy]="labelId" [options]="options()" [labelKey]="labelKey()"
      [valueKey]="valueKey()" [orientation]="orientation()" [value]="value()"
      [disabled]="disabled()" [invalid]="invalid()" [touched]="touched()"
      (valueChange)="value.set($event)" (touchedChange)="touched.set($event)" />
    @if (showError()) { <ui-error [message]="errorMessage()" /> }
  `,
})
export class UiFormFieldRadioGroup<T extends object> implements FormValueControl<T | null> {
  readonly label = input.required<string>();
  readonly options = input<readonly T[]>([]);
  readonly labelKey = input.required<keyof T>();
  readonly valueKey = input.required<keyof T>();
  readonly orientation = input<GroupOrientation>('vertical');
  readonly value = model<T | null>(null);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  protected readonly labelId = `ui-radio-group-label-${++nextRadioFieldId}`;
  private readonly control = viewChild(UiRadioGroup<T>);

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
