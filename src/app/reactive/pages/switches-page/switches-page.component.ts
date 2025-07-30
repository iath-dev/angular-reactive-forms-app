import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  form = this.fb.group({
    genre: ['M', [Validators.required]],
    wantNotifications: [true, [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
  });

  public submit() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
  }
}
