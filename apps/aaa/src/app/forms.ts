import type { Type } from '@angular/core';
import type { FormInputs } from './form-contract';
import { CustomerForm } from './forms/customer-form';
import type { CustomerBinding, CustomerConfig, CustomerResult } from './forms/customer-form';
import { RequestForm } from './forms/request-form';
import type { RequestBinding, RequestConfig, RequestResult } from './forms/request-form';

/** Aplikacja definiuje jedynie mapę formularzy i ich kontrakty. */
export const forms = {
  CUSTOMER: CustomerForm satisfies Type<FormInputs<CustomerBinding, CustomerConfig, CustomerResult>>,
  REQUEST: RequestForm satisfies Type<FormInputs<RequestBinding, RequestConfig, RequestResult>>,
};
