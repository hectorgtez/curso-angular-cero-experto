import { Component, inject } from '@angular/core';

import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  private _placesService = inject( PlacesService );
  private _mapService = inject( MapService );

  public selectedId: string = '';

  get isLoadingPlaces(): boolean {
    return this._placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesService.places;
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;

    const [ lng, lat ] = place.center;
    this._mapService.flyTo([ lng, lat ]);
  }

  getRoute( place: Feature ) {
    if (!this._placesService.userLocation) {
      throw new Error('No se pudo obtener la ubicación de usuario');
    }

    this._placesService.deletePlaces();

    const start = this._placesService.userLocation;
    const end = place.center as [number, number];

    this._mapService.getRoutesBetweenPoints( start, end );
  }
}
