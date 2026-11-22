import { describe, expect, it } from 'vitest';
import { selectDevForm } from '../../../../libs/form-runtime/src/dev-form';
import { forms } from '../app/forms';
import { defaultFormType, fixtures } from './fixtures';

describe('lokalne wybieranie formularza', () => {
  it('bez parametru uruchamia domyślny formularz z danymi testowymi', () => {
    expect(selectDevForm('', fixtures, defaultFormType)).toEqual({
      formType: 'CUSTOMER',
      fixture: fixtures.CUSTOMER,
    });
  });

  it('wybiera osobne dane dla formularza wskazanego w URL', () => {
    expect(selectDevForm('?formType=REQUEST', fixtures, defaultFormType)).toEqual({
      formType: 'REQUEST',
      fixture: fixtures.REQUEST,
    });
  });

  it('odrzuca nieznany formType', () => {
    expect(() => selectDevForm('?formType=OTHER', fixtures, defaultFormType)).toThrow(
      'Nieznany typ formularza: OTHER',
    );
  });

  it('każdy formularz w aplikacji ma fixture do uruchomienia lokalnego', () => {
    expect(Object.keys(fixtures).sort()).toEqual(Object.keys(forms).sort());
  });
});
