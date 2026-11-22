import type { CustomerBinding, CustomerConfig } from '../app/forms/customer-form';
import type { RequestBinding, RequestConfig } from '../app/forms/request-form';
import type { DocumentsDemoBinding, DocumentsDemoConfig } from '../app/forms/documents-demo-form';

type Fixture<TBinding, TConfig> = {
  binding: TBinding;
  config: TConfig;
};

/** Dane tylko do lokalnego uruchamiania aplikacji. Nie trafiają do bundla BAW. */
export const fixtures = {
  CUSTOMER: {
    binding: { firstName: 'Jan', lastName: 'Kowalski' },
    config: { title: 'Przykładowy klient' },
  } satisfies Fixture<CustomerBinding, CustomerConfig>,
  REQUEST: {
    binding: { requestId: 123, amount: 5000 },
    config: { currency: 'PLN', allowApproval: true },
  } satisfies Fixture<RequestBinding, RequestConfig>,
  DOCUMENTS_DEMO: {
    binding: {
      name: '',
      accepted: false,
      departments: [],
      mainDepartment: null,
      documents: [{
        id: 'example-document',
        fileName: 'przykladowy-dokument.pdf',
        mimeType: 'application/pdf',
        size: 100,
        createDate: '2026-11-22T10:00:00Z',
        modifyDate: '2026-11-22T10:00:00Z',
        retentionDate: null,
      }],
    },
    config: {
      title: 'Przykładowy formularz dokumentów',
      departments: [
        { id: 1, name: 'Kadry' },
        { id: 2, name: 'Księgowość' },
        { id: 3, name: 'IT' },
      ],
    },
  } satisfies Fixture<DocumentsDemoBinding, DocumentsDemoConfig>,
};

export const defaultFormType = 'CUSTOMER';
