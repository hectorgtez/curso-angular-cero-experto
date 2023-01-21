import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent {
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(resp => console.log(resp));
  }
}
