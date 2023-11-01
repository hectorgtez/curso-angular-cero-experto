import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    /**
     * El bloque encerrado entre estos dos comentarios se puede sustituir
     * con el llamado a un endpoint para validar si el correo ingresado
     * ya existe en la base de datos.
     * Debajo se encuentra el codigo que se utilizaría en dicho caso.
     */
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      if ( email === 'hectorgtez@gmail.com' ) {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay( 2000 )
    );

    /**
     * return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
     *  .pipe(
     *    map( resp => {
     *      return ( resp.length === 0 )
     *        ? null
     *        : { emailTaken: true }
     *    })
     *  );
     */

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   );
  // }
}
