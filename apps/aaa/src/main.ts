import { createApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { RegistrationForm } from './app/forms/registration-form/registration-form';

type FormDataType = { firstName: string; lastName: string };

export const init = async (
  formType: string,
  element: HTMLElement,
  data: FormDataType,
  onSave: (data: FormDataType) => void,
  globalCss: string = '',
) => {
  const appRef = await createApplication();
  const componentRef = appRef.bootstrap(RegistrationForm, element);

  const doc = element.ownerDocument;
  const styleElement = doc.createElement('style');
  styleElement.textContent = globalCss;
  doc.head.appendChild(styleElement);

  componentRef.setInput('data', data);
  componentRef.setInput('formType', formType);
  componentRef.setInput('onSave', onSave);

  return {
    destroy: () => {
      appRef.destroy();
      styleElement.remove();
    },
    setData: (data: FormDataType) => componentRef.setInput('data', data),
  };
};
