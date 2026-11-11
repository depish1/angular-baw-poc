import { Component, input, signal } from '@angular/core';
import { RegistrationForm } from './forms/registration-form/registration-form';

@Component({
  imports: [RegistrationForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  formType = input<string>('');
}
