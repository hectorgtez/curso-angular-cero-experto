import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor( private _authService: AuthService,
               private _router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this._authService.verificarAuth()
      .pipe(
        tap(isAuth => {
          if(!isAuth) {
            this._router.navigate(['./auth/login'])
          }
        })
      );
  }

  canLoad( route: Route,
           segments: UrlSegment[]): Observable<boolean> | boolean {

    return this._authService.verificarAuth()
      .pipe(
        tap(isAuth => {
          if(!isAuth) {
            this._router.navigate(['./auth/login'])
          }
        })
      );
  }
}
