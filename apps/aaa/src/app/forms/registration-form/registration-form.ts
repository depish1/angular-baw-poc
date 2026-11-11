import { Component, inject, input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'aaa-registration-form',
  standalone: true,
  styleUrl: './registration-form.css',
  templateUrl: './registration-form.html',
})
export class RegistrationForm {
  private viewContainer = inject(ViewContainerRef);
  async loadComponent() {
    const { LazyTestComponent } = await import('./components/lazy-test');

    this.viewContainer.createComponent(LazyTestComponent);
  }
}
