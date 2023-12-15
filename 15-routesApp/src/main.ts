import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import Mapboxgl from 'mapbox-gl';

import { AppModule } from './app/app.module';

Mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9yZ3RleiIsImEiOiJjbG50aHlseGswM2dsMnFtdXIzaWo2OGF3In0.9K3kLA7gThMBQ0vHf98-jA';

if ( !navigator.geolocation ) {
  alert('El navegador no soporta la geolocalización');
  throw new Error('El navegador no soporta la geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
