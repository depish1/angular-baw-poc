import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, required } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { UiRadioGroup } from './radio-group';
import { UiFormFieldRadioGroup } from '../form-field-radio-group/form-field-radio-group';

interface Department { id: number; name: string }

@Component({
  imports: [UiRadioGroup, UiFormFieldRadioGroup, FormField],
  template: `
    <ui-radio-group [options]="options()" labelKey="name" valueKey="id"
      [disabled]="disabled()" [(value)]="chosen" />
    <ui-radio-group [options]="options()" labelKey="name" valueKey="id" />
    <ui-form-field-radio-group label="Dział" [options]="options()" labelKey="name"
      valueKey="id" [formField]="fields.department" />
  `,
})
class RadioHost {
  readonly disabled = signal(false);
  readonly options = signal<Department[]>([{ id: 1, name: 'IT' }, { id: 2, name: 'HR' }]);
  readonly chosen = signal<Department | null>({ id: 2, name: 'Stara nazwa' });
  readonly data = signal({ department: null as Department | null });
  readonly fields = form(this.data, (path) => required(path.department, { message: 'Wybierz dział' }));
}

describe('UiRadioGroup', () => {
  it('porównuje całe obiekty po valueKey, a grupy mają odrębne nazwy DOM', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.detectChanges();
    const groups = [...fixture.nativeElement.querySelectorAll('ui-radio-group')] as HTMLElement[];
    const first = [...groups[0].querySelectorAll('input')] as HTMLInputElement[];
    const second = [...groups[1].querySelectorAll('input')] as HTMLInputElement[];
    expect(first.map((radio) => radio.checked)).toEqual([false, true]);
    expect(second.map((radio) => radio.checked)).toEqual([false, false]);
    expect(first[0].name).not.toBe(second[0].name);
  });

  it('wybiera jeden pełny obiekt i nie odznacza go ponownym kliknięciem', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('ui-radio-group input') as HTMLInputElement;
    input.click();
    expect(fixture.componentInstance.chosen()).toEqual({ id: 1, name: 'IT' });
    input.click();
    expect(fixture.componentInstance.chosen()).toEqual({ id: 1, name: 'IT' });
  });

  it('nie podmienia wybranego obiektu po odświeżeniu options', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.detectChanges();
    fixture.componentInstance.options.set([{ id: 1, name: 'IT-2' }, { id: 2, name: 'HR-2' }]);
    fixture.detectChanges();
    expect(fixture.componentInstance.chosen()).toEqual({ id: 2, name: 'Stara nazwa' });
    expect((fixture.nativeElement.querySelectorAll('ui-radio-group input')[1] as HTMLInputElement).checked).toBe(true);
  });

  it('obsługuje Signal Forms, walidację i disabled', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('ui-form-field-radio-group') as HTMLElement;
    fixture.componentInstance.fields.department().markAsTouched();
    fixture.detectChanges();
    expect(wrapper.querySelector('[role="alert"]')?.textContent).toContain('Wybierz dział');
    (wrapper.querySelector('input') as HTMLInputElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.data().department).toMatchObject({ id: 1, name: 'IT' });
    expect(wrapper.querySelector('ui-error')).toBeNull();
    expect(wrapper.querySelector('ui-radio-group')?.getAttribute('aria-labelledby')).toBe(wrapper.querySelector('ui-label')?.id);
  });

  it('nie zmienia wartości, gdy kontrolka jest disabled', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('ui-radio-group') as HTMLElement;
    const input = group.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    input.click();
    expect(fixture.componentInstance.chosen()).toEqual({ id: 2, name: 'Stara nazwa' });
  });
});
