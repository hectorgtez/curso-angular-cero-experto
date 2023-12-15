import { Injectable, inject } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/places-api-client';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _mapService = inject( MapService );
  private _placesApi = inject( PlacesApiClient );

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor() {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve(this.userLocation);
        },
        ( error ) => {
          alert('No se pudo obtener la geolocalización');
          console.log(error);
          reject();
        }
      );
    });
  }

  getPlacesByQuery( query: string = '' ) {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.userLocation) throw new Error('No se pudo encontrar la ubicación de usuario');

    this.isLoadingPlaces = true;

    this._placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( response =>  {
        this.isLoadingPlaces = false
        this.places = response.features;
        this._mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
