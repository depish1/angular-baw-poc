import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-test',
  standalone: true,
  template: `
    <h2>Komponent ładowany dynamicznie</h2>
    <p>Jeśli to widzisz, dynamiczny import działa!</p>
  `,
})
export class LazyTestComponent {}
