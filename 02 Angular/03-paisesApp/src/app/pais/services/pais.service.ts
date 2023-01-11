import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private _apiUrl: string = "https://restcountries.com/v2";

  constructor(private http: HttpClient) { }

  get getParams() {
    return new HttpParams().set("fields", "flag,name,capital,population,alpha2Code")
  }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, {params: this.getParams});
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${termino}?fields=flag,name,capital,population,alpha2Code`;
    return this.http.get<Country[]>(url, {params: this.getParams});
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this._apiUrl}/regionalbloc/${region}?fields=flag,name,capital,population,alpha2Code`;
    return this.http.get<Country[]>(url, {params: this.getParams});
  }

  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this._apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
}
