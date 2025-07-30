import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, of, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  countries = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  public form = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  get regions() {
    return this.countryService.regions;
  }

  onFormChanged = effect((onCleanup) => {
    const regionFormChanged = this.onRegionChange();
    const countryFormChanged = this.onCountryChange();

    onCleanup(() => {
      regionFormChanged?.unsubscribe();
      countryFormChanged?.unsubscribe();
    });
  });

  onRegionChange() {
    return this.form
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.form.get('country')?.setValue('')),
        tap(() => this.form.get('border')?.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countries.set([]);
        }),
        switchMap((region) => {
          return this.countryService.getCountriesByRegion(region!);
        })
      )
      .subscribe((value) => {
        this.countries.set(value);
      });
  }

  onCountryChange() {
    return this.form
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.form.get('border')?.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((country) =>
          this.countryService.getCountryByAlphaCode(country ?? '')
        ),
        switchMap((country) => {
          return this.countryService.getCountryBordersByCode(country?.borders!);
        })
      )
      .subscribe((value) => {
        this.borders.set(value);
      });
  }

  submit() {
    console.log(this.form.value);
  }
}
