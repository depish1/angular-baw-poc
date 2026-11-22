import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-label',
  template: `<label [attr.for]="forId() || null"><ng-content /></label>`,
  styles: [`:host { display: block; margin-bottom: var(--ui-spacing-xs, 4px); font-weight: 600; }`],
})
export class UiLabel {
  readonly forId = input('', { alias: 'for' });
}
