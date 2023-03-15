import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor( private _http: HttpClient ) { }

  verificarAuth(): Observable<boolean> {
    if(!localStorage.getItem("token")) {
      return of(false);
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth
          return true
        })
      )
  }

  login() {
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  get auth(): Auth {
    return {...this._auth!};
  }
}
