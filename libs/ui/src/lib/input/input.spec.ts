import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, required } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { UiInput } from './input';
import { UiFormFieldInput } from '../form-field-input/form-field-input';

@Component({
  imports: [UiInput, UiFormFieldInput, FormField],
  template: `
    <ui-input type="search" size="mini" [(value)]="query" />
    <ui-form-field-input label="Imię" [formField]="fields.name" />
  `,
})
class InputHost {
  readonly query = signal('start');
  readonly data = signal({ name: '' });
  readonly fields = form(this.data, (path) => required(path.name, { message: 'Imię jest wymagane' }));
}

describe('UiInput i UiFormFieldInput', () => {
  it('synchronizuje samodzielne pole i emituje zmianę podczas wpisywania', () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('ui-input input') as HTMLInputElement;
    expect(input.value).toBe('start');
    expect(input.type).toBe('search');
    expect(input.classList.contains('ui-input--mini')).toBe(true);
    input.value = 'szukaj';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(fixture.componentInstance.query()).toBe('szukaj');
  });

  it('współpracuje z Signal Forms i prezentuje błąd po dotknięciu pola', () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const field = fixture.nativeElement.querySelector('ui-form-field-input') as HTMLElement;
    const input = field.querySelector('input') as HTMLInputElement;
    const label = field.querySelector('label') as HTMLLabelElement;
    expect(label.htmlFor).toBe(input.id);
    expect(host.fields.name().invalid()).toBe(true);
    expect(host.fields.name().touched()).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(field.querySelector('ui-error')).toBeNull();
    host.fields.name().markAsTouched();
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(field.querySelector('[role="alert"]')?.textContent).toContain('Imię jest wymagane');
    expect(input.getAttribute('aria-describedby')).toBe(field.querySelector('[role="alert"]')?.id);
    input.value = 'Anna';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(host.data().name).toBe('Anna');
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(field.querySelector('ui-error')).toBeNull();
  });

  it('propaguje touched z Signal Forms', async () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('ui-form-field-input input') as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('blur'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.fields.name().touched()).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    fixture.componentInstance.fields.name().value.set('Gotowe');
    fixture.detectChanges();
    expect(input.value).toBe('Gotowe');
  });

  it('blokuje samodzielne pole po ustawieniu disabled', () => {
    const fixture = TestBed.createComponent(UiInput);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });
});
