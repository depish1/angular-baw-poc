import { createApplication } from '@angular/platform-browser';
import { inputBinding, type Type } from '@angular/core';
import { resolveForm } from '../../../libs/form-runtime/src/form-registry';
import type { FormBridge } from './app/form-contract';
import { forms } from './app/forms';

/**
 * Wejście wywoływane przez host (docelowo przez bridge BAW).
 * Binding i config mają typy zależne od formType; host JS przekazuje je jako unknown.
 * Kontrakt każdego formularza jest sprawdzany typami w jego implementacji i rejestrze.
 */
export async function init(
  formType: string,
  element: HTMLElement,
  binding: unknown,
  config: unknown,
  bridge: FormBridge<unknown>,
  globalCss = '',
) {
  const form: Type<unknown> = resolveForm(forms, formType);
  const appRef = await createApplication();

  const styleElement = element.ownerDocument.createElement('style');
  styleElement.textContent = globalCss;

  try {
    element.ownerDocument.head.appendChild(styleElement);
    // Wymagane inputy muszą być dostępne już podczas pierwszego renderu.
    appRef.bootstrap(form, {
      hostElement: element,
      bindings: [
        inputBinding('binding', () => binding),
        inputBinding('config', () => config),
        inputBinding('bridge', () => bridge),
      ],
    });

    return {
      destroy(): void {
        appRef.destroy();
        styleElement.remove();
      },
    };
  } catch (error) {
    appRef.destroy();
    styleElement.remove();
    throw error;
  }
}
