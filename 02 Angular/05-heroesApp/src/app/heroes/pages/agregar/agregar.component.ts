import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent {
  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( switchMap( ({id}) => this.heroesService.getHeroePorId(id) ) )
      .subscribe( heroe => this.heroe = heroe )
  }

  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ]

  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: ""
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => console.log("Actualizando...", heroe) )
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
        })
    }
  }
}
