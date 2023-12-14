import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map } from 'rxjs';

import type { User, UserResponse, UsersResponse } from '@interfaces/req-response';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _http = inject( HttpClient );

  #state = signal<State>({
    loading: true,
    users: []
  });

  public users = computed( () => this.#state().users );
  public loading = computed( () => this.#state().loading );

  constructor() {
    this._http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe( delay(1500) )
      .subscribe( response => {
        this.#state.set({
          loading: false,
          users: response.data,
        })
      });
  }

  getUserById( id: string ) {
    return this._http.get<UserResponse>(`https://reqres.in/api/users/${ id }`)
      .pipe(
        delay(1500),
        map( response => response.data )
      );
  }
}
