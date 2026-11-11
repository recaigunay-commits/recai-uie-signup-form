
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyForm } from '@ngx-formly/core';
import { SIGNUP_SUCCESS_MESSAGE, signUpFormFields } from './signup-form-config';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { SignUpPayload } from '../../models/auth.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, FormlyForm],
})
export class SignupComponent {
  authService = inject(AuthService);
  signUpForm = new FormGroup({});
  successMessage = signal<string | null>(null);
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

    this.authService
      .signUp(this.model())
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          this.successMessage.set(SIGNUP_SUCCESS_MESSAGE);
          setTimeout(() => {
            // this.router.navigate(['/login']); we can navigate login page
          }, 2000);
        },
        error: (err) => {
          // Handle errors
        },
      });
  }
}
