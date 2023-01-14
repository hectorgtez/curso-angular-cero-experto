import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {
  nombreLower: string = "héctor";
  nombreUpper: string = "HÉCTOR";
  nombreTitle: string = "hÉcToR gUtIéRrEz";

  fecha: Date = new Date();
}
