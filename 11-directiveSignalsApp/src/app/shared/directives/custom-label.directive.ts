import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {
  private _htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;
  private _color: string = 'red';

  @Input()
  set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input()
  set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  constructor( private element: ElementRef<HTMLElement> ) {
    this._htmlElement = element;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setErrorMessage(): void {
    if (!this._htmlElement) return;
    if (!this._errors) {
      this._htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this._htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    } else if (errors.includes('minlength')) {
      const minlength = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength']
      this._htmlElement.nativeElement.innerText = `Mínimo ${current}/${minlength} caracteres`;
      return;
    } else if (errors.includes('email')) {
      this._htmlElement.nativeElement.innerText = 'Este campo debe ser un correo';
      return;
    }
  }

  setStyle(): void {
    if (!this._htmlElement) return;
    this._htmlElement!.nativeElement.style.color = this._color;
  }
}
