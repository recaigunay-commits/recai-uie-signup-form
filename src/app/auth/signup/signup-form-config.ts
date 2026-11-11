import { Validators } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";

export const signUpFormFields: FormlyFieldConfig[] =  [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First name',
        placeholder: 'First name',
        required: true
      },
      validation: {
        messages: {
          required: 'First Name is required'
        }
      }
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last name',
        placeholder: 'Last name',
        required: true
      },
      validation: {
        messages: {
          required: 'Last Name is required'
        }
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Email address',
        type: 'email',
        required: true
      },
      validators: {
        validation: [Validators.email]
      },
      validation: {
        messages: {
          required: 'Email is required',
          email: 'Please enter a valid email'
        }
      }
    },
  ];

  export const SIGNUP_SUCCESS_MESSAGE = 'Account created! Redirecting to login...';