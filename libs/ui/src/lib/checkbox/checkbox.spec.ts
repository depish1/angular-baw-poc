import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, required } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { UiCheckbox } from './checkbox';
import { UiFormFieldCheckbox } from '../form-field-checkbox/form-field-checkbox';

@Component({
  imports: [UiCheckbox, UiFormFieldCheckbox, FormField],
  template: `
    <ui-checkbox [(value)]="manual">Ręcznie</ui-checkbox>
    <ui-form-field-checkbox label="Akceptuję" [formField]="fields.accepted" />
  `,
})
class CheckboxHost {
  readonly manual = signal(false);
  readonly data = signal({ accepted: false });
  readonly fields = form(this.data, (path) => required(path.accepted, { message: 'Zaznacz pole' }));
}

describe('UiCheckbox', () => {
  it('przechowuje boolean i propaguje zmianę natywnego checkboxa', () => {
    const fixture = TestBed.createComponent(CheckboxHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('ui-checkbox input') as HTMLInputElement;
    expect(input.checked).toBe(false);
    input.click();
    expect(fixture.componentInstance.manual()).toBe(true);
  });

  it('integruje się z Signal Forms i pokazuje błąd po dotknięciu pola', () => {
    const fixture = TestBed.createComponent(CheckboxHost);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('ui-form-field-checkbox') as HTMLElement;
    const input = group.querySelector('input') as HTMLInputElement;
    expect((group.querySelector('label') as HTMLLabelElement).htmlFor).toBe(input.id);
    fixture.componentInstance.fields.accepted().markAsTouched();
    fixture.detectChanges();
    expect(group.querySelector('[role="alert"]')?.textContent).toContain('Zaznacz pole');
    input.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.data().accepted).toBe(true);
    expect(group.querySelector('ui-error')).toBeNull();
  });

  it('przekazuje disabled do natywnego inputa', () => {
    const fixture = TestBed.createComponent(UiCheckbox);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    input.click();
    expect(fixture.componentInstance.value()).toBe(false);
  });
});
