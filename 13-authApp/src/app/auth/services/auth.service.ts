import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl: string = environment.baseUrl;
  private _http = inject( HttpClient );

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login( email: string, password: string ): Observable<boolean> {
    const url = `${ this._baseUrl }/auth/login`;
    const body = { email: email, password: password };

    return this._http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( error => throwError( () => error.error.message ))
      );
  }

  logout(): void {
    this.unsetAuthentication();
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${ this._baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.unsetAuthentication();
      return of( false );
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this._http.get<CheckTokenResponse>(url, { headers: headers })
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      )
  }

  private setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem( 'token', token );

    return true;
  }

  private unsetAuthentication(): void {
    localStorage.removeItem( 'token' );
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
