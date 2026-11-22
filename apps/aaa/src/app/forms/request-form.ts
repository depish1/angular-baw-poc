import { Component, input } from '@angular/core';
import type { FormBridge, FormInputs } from '../form-contract';

export interface RequestBinding {
  requestId: number;
  amount: number;
}

export interface RequestConfig {
  currency: string;
  allowApproval: boolean;
}

export interface RequestResult {
  requestId: number;
  approved: boolean;
}

@Component({
  selector: 'aaa-request-form',
  template: `
    <h1>Wniosek {{ binding().requestId }}</h1>
    <p>Kwota: {{ binding().amount }} {{ config().currency }}</p>
    <button type="button" [disabled]="!config().allowApproval" (click)="approve()">Zatwierdź</button>
  `,
})
export class RequestForm implements FormInputs<RequestBinding, RequestConfig, RequestResult> {
  readonly binding = input.required<RequestBinding>();
  readonly config = input.required<RequestConfig>();
  readonly bridge = input.required<FormBridge<RequestResult>>();

  protected approve(): void {
    this.bridge().complete({ requestId: this.binding().requestId, approved: true });
  }
}
