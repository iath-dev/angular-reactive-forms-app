import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  public form = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(FormUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        [FormUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(FormUtils.notOnlySpacesPattern),
        ],
        [FormUtils.strider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [FormUtils.matchFields('password', 'confirmPassword')],
    }
  );

  public submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }
}
