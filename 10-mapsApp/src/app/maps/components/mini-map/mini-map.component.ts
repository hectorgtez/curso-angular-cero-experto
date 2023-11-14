import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  @Input()
  lngLat?: [number, number];

  public map?: Map;
  public zoom: number = 15;

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map div not found.";
    if ( !this.lngLat ) throw "LngLat can't be null.";

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false,
    });

    new Marker({
      color: 'red'
    })
      .setLngLat( this.lngLat )
      .addTo( this.map );
  }
}
