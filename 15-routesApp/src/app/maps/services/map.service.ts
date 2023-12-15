import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _map?: Map;

  get isMapReady(): boolean {
    return !!this._map;
  }

  setMap( map: Map ): void {
    this._map = map;
  }

  flyTo( coords: LngLatLike ) {
    if ( !this.isMapReady ) throw new Error('El mapa no se ha inicializado...');

    this._map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
}
