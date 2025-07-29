import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  public myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  newFavorite = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  addFavorite() {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favorites.push(this.formBuilder.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  removeFavorite(index: number) {
    this.favorites.removeAt(index);
  }

  get favorites() {
    return this.myForm.get('favorites') as FormArray;
  }

  onSave() {
    console.log(this.myForm.value);
  }
}
