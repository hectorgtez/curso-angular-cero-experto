import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TitleComponent } from '@shared/title/title.component';
import { HeavyLoadersSlowComponent } from '@shared/heavy-loaders/heavy-loaders-slow.component';

@Component({
  standalone: true,
  imports: [ CommonModule, TitleComponent, HeavyLoadersSlowComponent ],
  templateUrl: './defer-views.component.html',
  styles: ``
})
export default class DeferViewsComponent {

}
