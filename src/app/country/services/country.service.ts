import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  public get regions(): string[] {
    return [...this._regions];
  }

  public getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<Country[]>(url);
  }

  public getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBordersByCode(borders: string[]) {
    if (borders.length === 0) return of([]);

    const requests = borders.map((border) => {
      return this.getCountryByAlphaCode(border);
    });

    return combineLatest(requests);
  }
}
