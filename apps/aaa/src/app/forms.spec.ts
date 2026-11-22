import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { resolveForm } from '../../../../libs/form-runtime/src/form-registry';
import { forms } from './forms';
import { CustomerForm } from './forms/customer-form';
import { RequestForm } from './forms/request-form';
import { DocumentsDemoForm } from './forms/documents-demo-form';

describe('wybór formularza na podstawie formType', () => {
  it('wybiera właściwy komponent z rejestru aplikacji', () => {
    expect(resolveForm(forms, 'CUSTOMER')).toBe(CustomerForm);
    expect(resolveForm(forms, 'REQUEST')).toBe(RequestForm);
    expect(resolveForm(forms, 'DOCUMENTS_DEMO')).toBe(DocumentsDemoForm);
  });

  it('zgłasza jednoznaczny błąd dla nieznanego typu', () => {
    expect(() => resolveForm(forms, 'UNKNOWN')).toThrow('Nieznany typ formularza: UNKNOWN');
    expect(() => resolveForm(forms, 'toString')).toThrow('Nieznany typ formularza: toString');
  });
});

describe('kontrakt inicjalizacji formularzy', () => {
  it('przekazuje binding, config i bridge do formularza klienta', () => {
    const complete = vi.fn();
    const fixture = TestBed.createComponent(CustomerForm);
    fixture.componentRef.setInput('binding', { firstName: 'Anna', lastName: 'Nowak' });
    fixture.componentRef.setInput('config', { title: 'Dane klienta' });
    fixture.componentRef.setInput('bridge', { complete });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Dane klienta');
    expect(fixture.nativeElement.textContent).toContain('Anna Nowak');
    fixture.nativeElement.querySelector('button').click();
    expect(complete).toHaveBeenCalledWith({ fullName: 'Anna Nowak' });
  });

  it('przekazuje odmienny binding i config do formularza wniosku', () => {
    const complete = vi.fn();
    const fixture = TestBed.createComponent(RequestForm);
    fixture.componentRef.setInput('binding', { requestId: 17, amount: 250 });
    fixture.componentRef.setInput('config', { currency: 'PLN', allowApproval: true });
    fixture.componentRef.setInput('bridge', { complete });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Wniosek 17');
    expect(fixture.nativeElement.textContent).toContain('250 PLN');
    fixture.nativeElement.querySelector('button').click();
    expect(complete).toHaveBeenCalledWith({ requestId: 17, approved: true });
  });
});
