import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'default' | 'mini';

@Component({
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class UiButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('default');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);

  readonly clicked = output<MouseEvent>();

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled()) this.clicked.emit(event);
  }
}
