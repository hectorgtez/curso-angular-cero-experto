import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs';

import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { User } from '@interfaces/req-response';

@Component({
  standalone: true,
  imports: [ CommonModule, TitleComponent ],
  template: `
    <app-title [title]="fullName()"/>

    @if (user()) {
      <section>
        <img
          [srcset]="user()!.avatar"
          [alt]="user()!.first_name"
        >
        <div>
          <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
          <p>{{ user()!.email }}</p>
        </div>
      </section>
    } @else {
      <p>Cargando...</p>
    }
  `,
  styles: ``
})
export default class UserComponent {
  private _route = inject( ActivatedRoute );
  private _usersService = inject( UsersService );

  public user = toSignal(
    this._route.params.pipe(
      switchMap( ({ id }) => this._usersService.getUserById( id ) )
    )
  );

  public fullName = computed(() => {
    return this.user()
        ? `User: ${ this.user()!.first_name } ${ this.user()!.last_name }`
        : 'User';
  });
}
