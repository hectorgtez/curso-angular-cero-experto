import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private _placesService = inject( PlacesService );
  private _mapService = inject( MapService );

  ngAfterViewInit(): void {
    if ( !this._placesService.userLocation ) throw new Error('No se pudo obtener userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this._placesService.userLocation,
      zoom: 14,
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy...</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

      new Marker({ color: 'red' })
        .setLngLat( this._placesService.userLocation )
        .setPopup( popup )
        .addTo( map );

      this._mapService.setMap( map );
  }
}
