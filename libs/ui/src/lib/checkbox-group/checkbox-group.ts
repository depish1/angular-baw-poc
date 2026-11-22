import { Component, ElementRef, inject, input, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { UiCheckbox } from '../checkbox/checkbox';

export type GroupOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'ui-checkbox-group',
  imports: [UiCheckbox],
  host: {
    'role': 'group',
    '[attr.aria-labelledby]': 'labelledBy() || null',
    '[attr.aria-invalid]': 'invalid()',
    '(focusout)': 'onFocusOut($event)',
  },
  template: `
    <div class="ui-options" [class.ui-options--horizontal]="orientation() === 'horizontal'">
      @for (option of options(); track option[valueKey()]) {
        <label class="ui-option">
          <ui-checkbox [value]="isSelected(option)" [disabled]="disabled()"
            (valueChange)="setSelection(option, $event)" />
          {{ option[labelKey()] }}
        </label>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ui-options { display: flex; flex-direction: column; gap: var(--ui-spacing-sm, 8px); }
    .ui-options--horizontal { flex-direction: row; flex-wrap: wrap; gap: var(--ui-spacing-lg, 16px); }
    .ui-option { display: inline-flex; align-items: center; gap: var(--ui-spacing-sm, 8px); cursor: pointer; }
  `],
})
export class UiCheckboxGroup<T extends object> implements FormValueControl<T[]> {
  readonly options = input<readonly T[]>([]);
  readonly labelKey = input.required<keyof T>();
  readonly valueKey = input.required<keyof T>();
  readonly value = model<T[]>([]);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly orientation = input<GroupOrientation>('vertical');
  readonly labelledBy = input('');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected isSelected(option: T): boolean {
    return this.value().some((selected) => selected[this.valueKey()] === option[this.valueKey()]);
  }

  protected setSelection(option: T, selected: boolean): void {
    if (this.disabled()) return;
    const key = this.valueKey();
    const previous = this.value();
    if (selected) {
      if (!this.isSelected(option)) this.value.set([...previous, option]);
    } else {
      this.value.set(previous.filter((item) => item[key] !== option[key]));
    }
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.touched.set(true);
    }
  }

  focus(options?: FocusOptions): void {
    this.host.nativeElement.querySelector('input')?.focus(options);
  }
}
