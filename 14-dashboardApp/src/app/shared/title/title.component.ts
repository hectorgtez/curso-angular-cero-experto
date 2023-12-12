import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-3xl mb-5">{{ title }}</h2>
  `,
  styles: ``
})
export class TitleComponent {
  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow?: boolean = false;
}
