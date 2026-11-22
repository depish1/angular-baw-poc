import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { UiButton } from './button';

@Component({
  imports: [UiButton],
  template: `
    <ui-button
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      (clicked)="onClick($event)"
    >Usuń</ui-button>
  `,
})
class ButtonHost {
  readonly variant = signal<'primary' | 'secondary'>('primary');
  readonly size = signal<'default' | 'mini'>('default');
  readonly disabled = signal(false);
  readonly onClick = vi.fn();
}

describe('UiButton', () => {
  it('wyświetla treść, wariant i rozmiar mini', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.componentInstance.variant.set('secondary');
    fixture.componentInstance.size.set('mini');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Usuń');
    expect(button.classList.contains('ui-button--secondary')).toBe(true);
    expect(button.classList.contains('ui-button--mini')).toBe(true);
    expect(button.type).toBe('button');
  });

  it('emituje clicked po natywnym kliknięciu', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    expect(fixture.componentInstance.onClick).toHaveBeenCalledOnce();
    expect(fixture.componentInstance.onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('nie emituje clicked dla disabled', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    button.click();
    // Zabezpieczenie także przed sztucznie wygenerowanym zdarzeniem DOM.
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fixture.componentInstance.onClick).not.toHaveBeenCalled();
  });

  it('przekazuje natywny typ submit', () => {
    const fixture = TestBed.createComponent(UiButton);
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('button') as HTMLButtonElement).type).toBe('submit');
  });
});
