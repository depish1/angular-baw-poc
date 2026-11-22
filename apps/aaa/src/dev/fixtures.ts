import type { CustomerBinding, CustomerConfig } from '../app/forms/customer-form';
import type { RequestBinding, RequestConfig } from '../app/forms/request-form';

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
};

export const defaultFormType = 'CUSTOMER';
