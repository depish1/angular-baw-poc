import { Component, ElementRef, input, model, viewChild } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'ui-checkbox',
  template: `
    <span class="ui-checkbox">
      <input #control type="checkbox" [id]="id()" [checked]="value()"
        [disabled]="disabled()" [attr.aria-invalid]="invalid()"
        [attr.aria-describedby]="describedBy() || null"
        (change)="value.set($any($event.target).checked)" (blur)="touched.set(true)" />
      <ng-content />
    </span>
  `,
  styles: [`
    :host { display: inline-block; }
    .ui-checkbox { display: inline-flex; align-items: center; gap: var(--ui-spacing-sm, 8px); }
    input { accent-color: var(--ui-color-primary, #175cd3); }
    input:focus-visible { outline: 2px solid var(--ui-color-focus, #175cd3); outline-offset: 2px; }
  `],
})
export class UiCheckbox implements FormValueControl<boolean> {
  readonly value = model(false);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = model(false);
  readonly id = input('');
  readonly describedBy = input('');

  private readonly control = viewChild<ElementRef<HTMLInputElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
