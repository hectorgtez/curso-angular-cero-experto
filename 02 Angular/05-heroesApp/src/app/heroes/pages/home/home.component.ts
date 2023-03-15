import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent {
  constructor( private _router: Router,
               private _authService: AuthService ) {}

  get auth() {
    return this._authService.auth;
  }

  logout() {
    this._router.navigate(['./auth']);
  }
}
