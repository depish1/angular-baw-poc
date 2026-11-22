import { Component, input } from '@angular/core';
import type { FormBridge, FormInputs } from '../form-contract';

export interface CustomerBinding {
  firstName: string;
  lastName: string;
}

export interface CustomerConfig {
  title: string;
}

export interface CustomerResult {
  fullName: string;
}

@Component({
  selector: 'aaa-customer-form',
  template: `
    <h1>{{ config().title }}</h1>
    <p>Klient: {{ binding().firstName }} {{ binding().lastName }}</p>
    <button type="button" (click)="finish()">Zakończ</button>
  `,
})
export class CustomerForm implements FormInputs<CustomerBinding, CustomerConfig, CustomerResult> {
  readonly binding = input.required<CustomerBinding>();
  readonly config = input.required<CustomerConfig>();
  readonly bridge = input.required<FormBridge<CustomerResult>>();

  protected finish(): void {
    this.bridge().complete({ fullName: `${this.binding().firstName} ${this.binding().lastName}` });
  }
}
