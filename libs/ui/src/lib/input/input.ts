import { Component, ElementRef, input, model, viewChild } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';

export type InputType = 'text' | 'search' | 'email' | 'password';
export type InputSize = 'default' | 'mini';

@Component({
  selector: 'ui-input',
  template: `<input #control [id]="id()" [type]="type()" [value]="value()"
    [placeholder]="placeholder()" [disabled]="disabled()" [readOnly]="readonly()"
    [attr.aria-invalid]="invalid()" [attr.aria-describedby]="describedBy() || null"
    [class.ui-input--mini]="size() === 'mini'"
    (input)="value.set($any($event.target).value)" (blur)="touched.set(true)" />`,
  styleUrl: './input.css',
})
export class UiInput implements FormValueControl<string> {
  readonly value = model('');
  readonly type = input<InputType>('text');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly invalid = input(false);
  readonly size = input<InputSize>('default');
  readonly id = input('');
  readonly describedBy = input('');
  readonly touched = model(false);

  private readonly control = viewChild<ElementRef<HTMLInputElement>>('control');

  focus(options?: FocusOptions): void {
    this.control()?.nativeElement.focus(options);
  }
}
