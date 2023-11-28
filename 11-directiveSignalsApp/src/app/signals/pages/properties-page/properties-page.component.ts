import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit {
  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }`);
  public counter = signal( 10 );
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });
  public userChangeEffect = effect( () => {
    console.log(`${ this.user().first_name } - ${ this.counter() }`);
  });

  ngOnInit(): void {
    // setInterval( () => {
    //   this.counter.update( current => current + 1 );
    // }, 1000);
  }

  onFieldUpdated( field: keyof User, value: string ): void {
    this.user.mutate( current => {
       switch( field ) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number( value );
          break;
       }
    });
  }

  increaseBy( value: number ): void {
    this.counter.update( current => current + value );
  }
}
