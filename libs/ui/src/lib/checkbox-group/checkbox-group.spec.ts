import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, minLength } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { UiCheckboxGroup } from './checkbox-group';
import { UiFormFieldCheckboxGroup } from '../form-field-checkbox-group/form-field-checkbox-group';

interface Department { id: number; name: string }

@Component({
  imports: [UiCheckboxGroup, UiFormFieldCheckboxGroup, FormField],
  template: `
    <ui-checkbox-group [options]="options()" labelKey="name" valueKey="id"
      orientation="horizontal" [(value)]="chosen" />
    <ui-form-field-checkbox-group label="Działy" [options]="options()"
      labelKey="name" valueKey="id" [formField]="fields.departments" />
  `,
})
class GroupHost {
  readonly options = signal<Department[]>([{ id: 1, name: 'IT' }, { id: 2, name: 'HR' }]);
  readonly chosen = signal<Department[]>([{ id: 2, name: 'Stara nazwa' }]);
  readonly data = signal({ departments: [] as Department[] });
  readonly fields = form(this.data, (path) => minLength(path.departments, 1, { message: 'Wybierz dział' }));
}

describe('UiCheckboxGroup', () => {
  it('identyfikuje zaznaczone obiekty przez valueKey zamiast referencji', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('ui-checkbox-group') as HTMLElement;
    const inputs = [...group.querySelectorAll('input')] as HTMLInputElement[];
    expect(inputs.map((input) => input.checked)).toEqual([false, true]);
    expect(group.querySelector('.ui-options--horizontal')).not.toBeNull();
  });

  it('dodaje pełny obiekt i usuwa po kluczu', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    const inputs = [...fixture.nativeElement.querySelector('ui-checkbox-group').querySelectorAll('input')] as HTMLInputElement[];
    inputs[0].click();
    expect(fixture.componentInstance.chosen()).toEqual([
      { id: 2, name: 'Stara nazwa' },
      { id: 1, name: 'IT' },
    ]);
    inputs[1].click();
    expect(fixture.componentInstance.chosen()).toEqual([{ id: 1, name: 'IT' }]);
  });

  it('nie podmienia zapisanych obiektów po odświeżeniu options', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    fixture.componentInstance.options.set([{ id: 1, name: 'IT-2' }, { id: 2, name: 'HR-2' }]);
    fixture.detectChanges();
    expect(fixture.componentInstance.chosen()).toEqual([{ id: 2, name: 'Stara nazwa' }]);
    expect((fixture.nativeElement.querySelectorAll('ui-checkbox-group input')[1] as HTMLInputElement).checked).toBe(true);
  });

  it('obsługuje Signal Forms, walidację i disabled', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    fixture.componentInstance.fields.departments().markAsTouched();
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('ui-form-field-checkbox-group') as HTMLElement;
    expect(wrapper.querySelector('[role="alert"]')?.textContent).toContain('Wybierz dział');
    (wrapper.querySelector('input') as HTMLInputElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.data().departments).toHaveLength(1);
    expect(fixture.componentInstance.data().departments[0]).toMatchObject({ id: 1, name: 'IT' });
    expect(wrapper.querySelector('ui-error')).toBeNull();
  });
});
