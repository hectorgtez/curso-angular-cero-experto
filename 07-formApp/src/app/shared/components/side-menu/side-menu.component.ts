import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [`
    .cursor-pointer {
      cursor: pointer;
    }

    .hover-primary:hover {
      background-color: #0d6efd;
      border-color: #0d6efd;
      color: #ffffff;
      transition-delay: 0.01s;
      transition-duration: 0.15s;
      transition-timing-function: ease-in-out;
    }
  `]
})
export class SideMenuComponent {
  public reacticeMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ]

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ]
}
