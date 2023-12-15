import { Injectable, inject } from '@angular/core';

import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

import { DirectionsApiClient } from '../api/directions-api-client';
import { Feature } from '../interfaces/places.interface';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _directionsApi = inject( DirectionsApiClient );

  private _map?: Map;
  private _markers: Marker[] = [];

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

  createMarkersFromPlaces( places: Feature[], userLocation: [number, number] ) {
    if ( !this.isMapReady ) throw new Error('El mapa no se ha inicializado...');

    this._markers.forEach( marker => marker.remove() );

    const newMarkers = [];
    for (const place of places) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${ place.text_es }</h6>
          <span>${ place.place_name }</span>
        `);
      const newMarker = new Marker()
        .setLngLat([ lng, lat ])
        .setPopup( popup )
        .addTo( this._map! );

      newMarkers.push( newMarker );
    }

    this._markers = newMarkers;

    if ( places.length === 0 ) return;

    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ));
    bounds.extend( userLocation );

    this._map?.fitBounds( bounds, {
      padding: 200
    });
  }

  getRoutesBetweenPoints( start: [number, number], end: [number, number] ) {
    this._directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
      .subscribe( response => this.drawPolyline(response.routes[0]) );
  }

  private drawPolyline( route: Route ) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this._map) throw new Error('El mapa no se ha inicializado...');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach( ([ lng, lat ]) => bounds.extend([ lng, lat ]) )

    this._map?.fitBounds( bounds, {
      padding: 200
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (this._map.getLayer('RouteString')) {
      this._map.removeLayer('RouteString');
      this._map.removeSource('RouteString');
    }

    this._map.addSource( 'RouteString', sourceData );
    this._map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }
}
