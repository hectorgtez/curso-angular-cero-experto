import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';

import { User, SingleUserResponse } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private _http = inject( HttpClient );
  private _baseUrl = 'https://reqres.in/api/users';

  getUserById( id: number ): Observable<User> {
    return this._http.get<SingleUserResponse>(`${ this._baseUrl }/${ id }`)
      .pipe(
        map( response => response.data )
      );
  }
}
