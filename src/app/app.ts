import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormlyForm } from '@ngx-formly/core';
import { SignupComponent } from './auth/signup/signup';

@Component({
  imports: [SignupComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('recai-uie-signup-form');
}
