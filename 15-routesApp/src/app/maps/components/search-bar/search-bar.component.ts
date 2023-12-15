import { Component, inject } from '@angular/core';

import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private _debounceTimer?: NodeJS.Timeout;
  private _placesService = inject( PlacesService );

  onQueryChanged( query: string = '' ): void {
    if (this._debounceTimer) clearTimeout( this._debounceTimer );

    this._debounceTimer = setTimeout( () => {
      this._placesService.getPlacesByQuery( query );
    }, 350);
  }
}
