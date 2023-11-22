import { Component, Input } from '@angular/core';

import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'counter-alone',
  standalone: true,
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css']
})
export class CounterAloneComponent {
  @Input()
  public counter: number = 10;
}
