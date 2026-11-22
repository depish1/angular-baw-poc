import { Component, ElementRef, inject, input, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { GroupOrientation } from '../checkbox-group/checkbox-group';

let nextRadioGroupId = 0;

@Component({
  selector: 'ui-radio-group',
  host: {
    'role': 'radiogroup',
    '[attr.aria-labelledby]': 'labelledBy() || null',
    '[attr.aria-invalid]': 'invalid()',
    '(focusout)': 'onFocusOut($event)',
  },
  template: `
    <div class="ui-options" [class.ui-options--horizontal]="orientation() === 'horizontal'">
      @for (option of options(); track option[valueKey()]) {
        <label class="ui-option">
          <input type="radio" [name]="groupName" [checked]="isSelected(option)"
            [disabled]="disabled()" (change)="select(option)" />
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
    input { accent-color: var(--ui-color-primary, #175cd3); }
    input:focus-visible { outline: 2px solid var(--ui-color-focus, #175cd3); outline-offset: 2px; }
  `],
})
export class UiRadioGroup<T extends object> implements FormValueControl<T | null> {
  readonly options = input<readonly T[]>([]);
  readonly labelKey = input.required<keyof T>();
  readonly valueKey = input.required<keyof T>();
  readonly value = model<T | null>(null);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly orientation = input<GroupOrientation>('vertical');
  readonly labelledBy = input('');

  protected readonly groupName = `ui-radio-group-${++nextRadioGroupId}`;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected isSelected(option: T): boolean {
    const selected = this.value();
    return selected !== null && selected[this.valueKey()] === option[this.valueKey()];
  }

  protected select(option: T): void {
    if (!this.disabled() && !this.isSelected(option)) this.value.set(option);
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.touched.set(true);
    }
  }

  focus(options?: FocusOptions): void {
    const selected = this.host.nativeElement.querySelector<HTMLInputElement>('input:checked');
    (selected ?? this.host.nativeElement.querySelector<HTMLInputElement>('input'))?.focus(options);
  }
}
