import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent {
  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.heroesService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe);
  }

  regresar() {
    this.router.navigate(["/heroes/listado"]);
  }
}
