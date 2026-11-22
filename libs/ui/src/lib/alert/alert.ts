import { Component, input } from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'ui-alert',
  template: `<ng-content />`,
  styleUrl: './alert.css',
  host: {
    '[attr.role]': "variant() === 'error' ? 'alert' : 'status'",
    '[class.ui-alert--info]': "variant() === 'info'",
    '[class.ui-alert--success]': "variant() === 'success'",
    '[class.ui-alert--warning]': "variant() === 'warning'",
    '[class.ui-alert--error]': "variant() === 'error'",
  },
})
export class UiAlert {
  readonly variant = input<AlertVariant>('info');
}
