/** Wybór formularza nie zależy od Angulara ani API IBM BAW. */
export function resolveForm<T>(forms: Readonly<Record<string, T>>, formType: string): T {
  if (!Object.hasOwn(forms, formType)) {
    throw new Error(`Nieznany typ formularza: ${formType}`);
  }

  return forms[formType];
}
