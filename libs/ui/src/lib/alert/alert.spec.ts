import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { UiAlert } from './alert';

@Component({
  imports: [UiAlert],
  template: `<ui-alert variant="error">Błąd uploadu</ui-alert>`,
})
class AlertHost {}

describe('UiAlert', () => {
  it('ma domyślny wariant info i rolę status', () => {
    const fixture = TestBed.createComponent(UiAlert);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.classList.contains('ui-alert--info')).toBe(true);
  });

  it('wyświetla projekcję treści i rolę alert dla błędu', () => {
    const fixture = TestBed.createComponent(AlertHost);
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('ui-alert') as HTMLElement;
    expect(alert.textContent?.trim()).toBe('Błąd uploadu');
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.classList.contains('ui-alert--error')).toBe(true);
  });

  it.each(['success', 'warning'] as const)('wariant %s ma rolę status', (variant) => {
    const fixture = TestBed.createComponent(UiAlert);
    fixture.componentRef.setInput('variant', variant);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.classList.contains(`ui-alert--${variant}`)).toBe(true);
  });
});
