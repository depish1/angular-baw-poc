import { resolveForm } from './form-registry';

/**
 * Wybiera lokalne dane startowe bez znajomości Angulara ani danych biznesowych.
 * Fixtures są dostarczane osobno przez każdą aplikację.
 */
export function selectDevForm<T>(
  search: string,
  fixtures: Readonly<Record<string, T>>,
  defaultFormType: string,
): { formType: string; fixture: T } {
  const formType = new URLSearchParams(search).get('formType') || defaultFormType;
  return { formType, fixture: resolveForm(fixtures, formType) };
}
