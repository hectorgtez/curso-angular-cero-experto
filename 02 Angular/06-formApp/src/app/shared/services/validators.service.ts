import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
      if (value === 'strider') {
        return {
          noStrider: true
        }
      }

    return null;
  }

  public isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }
}
