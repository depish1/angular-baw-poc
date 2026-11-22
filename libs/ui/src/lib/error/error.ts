import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-error',
  template: `@if (message()) { <span [id]="id()" role="alert">{{ message() }}</span> }`,
  styles: [`:host { display: block; margin-top: var(--ui-spacing-xs, 4px); color: var(--ui-color-error, #b42318); font-size: .875rem; }`],
})
export class UiError {
  readonly message = input('');
  readonly id = input('');
}
