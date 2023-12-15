import { Component, inject } from '@angular/core';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {
  private _mapService = inject( MapService );
  private _placesService = inject( PlacesService );

  goToMyLocation(): void {
    if ( !this._placesService.isUserLocationReady ) throw new Error('No hay ubicación de usuario');
    if ( !this._mapService.isMapReady ) throw new Error('No hay mapa disponible');

    this._mapService.flyTo( this._placesService.userLocation! );
  }
}
