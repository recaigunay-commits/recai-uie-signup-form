
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyForm } from '@ngx-formly/core';
import { SIGNUP_MESSAGES, signUpFormFields } from './signup-form-config';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { SignUpPayload } from '../../models/auth.interface';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, FormlyForm],
})
export class SignupComponent {
  readonly successMessage = SIGNUP_MESSAGES.success;
  authService = inject(AuthService);
  signUpForm = new FormGroup({});
  isSuccess = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  model = signal<SignUpPayload>({
    firstName: '',
    lastName: '',
    email: '',
  });
  fields: FormlyFieldConfig[] = signUpFormFields;

  onSubmit(): void {
    if (this.signUpForm.invalid || this.isLoading()) {
      return;
    }

    // Usually we are dispatching action and listening that action on ngrx/redux effects and effect is calling service and update reducer then
    // getting results with selectors if it is successfully created. 

    this.isLoading.set(true);
    this.isSuccess.set(false);
    this.errorMessage.set(null);
    this.authService
      .signUp(this.model())
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          this.isSuccess.set(true);
          // once it is successfully created we can redirect user to login page automatically.
        },
        error: (err: HttpErrorResponse) => {
          const message =
          err.status === 0
            ? SIGNUP_MESSAGES.errorConnection
            : err.error?.error || SIGNUP_MESSAGES.errorFail;

        this.errorMessage.set(message);
        },
      });
  }
}
