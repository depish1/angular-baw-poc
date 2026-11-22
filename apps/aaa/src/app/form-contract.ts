import type { InputSignal } from '@angular/core';

/** Placeholder: w środowisku BAW implementację dostarczy bridge. */
export interface FormBridge<TResult> {
  complete(result: TResult): void;
}

/** Typy danych są definiowane osobno przez każdy formularz. */
export interface FormInputs<TBinding, TConfig, TResult> {
  readonly binding: InputSignal<TBinding>;
  readonly config: InputSignal<TConfig>;
  readonly bridge: InputSignal<FormBridge<TResult>>;
}
