import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { DocumentsDemoForm } from './documents-demo-form';
import { fixtures } from '../../dev/fixtures';

function setup() {
  TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  const fixture = TestBed.createComponent(DocumentsDemoForm);
  const complete = vi.fn();
  fixture.componentRef.setInput('binding', fixtures.DOCUMENTS_DEMO.binding);
  fixture.componentRef.setInput('config', fixtures.DOCUMENTS_DEMO.config);
  fixture.componentRef.setInput('bridge', { complete });
  fixture.detectChanges();
  return { fixture, complete };
}

describe('formularz demonstracyjny ui i Documents', () => {
  it('wyświetla wspólne pola i dokumenty z danych inicjalnych', () => {
    const { fixture } = setup();
    expect(fixture.nativeElement.querySelector('ui-form-field-input input')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ui-form-field-checkbox-group input')).toHaveLength(3);
    expect(fixture.nativeElement.querySelectorAll('ui-form-field-radio-group input')).toHaveLength(3);
    expect(fixture.nativeElement.textContent).toContain('przykladowy-dokument.pdf');
  });

  it('blokuje zakończenie niepoprawnego formularza i wyświetla błędy', () => {
    const { fixture, complete } = setup();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    expect(complete).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('ui-alert[role="alert"]')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Podaj imię');
  });

  it('kończy poprawnie uzupełniony formularz, przekazując całe obiekty do bridge', () => {
    const { fixture, complete } = setup();
    const name = fixture.nativeElement.querySelector('ui-form-field-input input') as HTMLInputElement;
    name.value = 'Anna';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    (fixture.nativeElement.querySelector('ui-form-field-checkbox input') as HTMLInputElement).click();
    (fixture.nativeElement.querySelector('ui-form-field-checkbox-group input') as HTMLInputElement).click();
    (fixture.nativeElement.querySelector('ui-form-field-radio-group input') as HTMLInputElement).click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    expect(complete).toHaveBeenCalledOnce();
    expect(complete.mock.calls[0][0]).toMatchObject({
      name: 'Anna',
      accepted: true,
      departments: [{ id: 1, name: 'Kadry' }],
      mainDepartment: { id: 1, name: 'Kadry' },
      documents: [{ fileName: 'przykladowy-dokument.pdf' }],
    });
  });
});
