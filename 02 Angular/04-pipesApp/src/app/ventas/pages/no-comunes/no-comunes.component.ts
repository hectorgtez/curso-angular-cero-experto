import { Component } from '@angular/core';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html'
})
export class NoComunesComponent {
  // i18nSelect
  nombre: string = "Héctor";
  genero: string = "masculino";
  invitacionMapa = {
    "masculino": "invitarlo",
    "femenino": "invitarla"
  }

  // i18nPlural
  clientes: string[] = ["María", "Pedro", "Juan", "Eduardo", "Hector"];
  clientesMapa = {
    "=0": "no tenemos ningún cliente esperando.",
    "=1": "tenemos un cliente esperando.",
    "other": "tenemos # clientes esperando.",
  }

  cambiarNombre(): void {
    if(this.genero === "masculino") {
      this.nombre = "Deisy";
      this.genero = "femenino";
    } else {
      this.nombre = "Héctor";
      this.genero = "masculino";
    }
  }

  borrarCliente(): void {
    if(this.clientes.length === 0) {
      return;
    }

    this.clientes.pop();
  }
}
