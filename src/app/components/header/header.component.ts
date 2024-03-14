import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface NavItem {
  name: string,
  url: string
}

@Component({
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  app: AppComponent = inject(AppComponent)

  navItems: NavItem[] = [
    { name: 'route1', url: 'route1' },
    { name: 'route2', url: 'route2' },
    { name: 'route3', url: 'route3' },
    { name: 'route4', url: 'route4' },
  ]

  openNavModal() {
    this.app.openNavModal()
  }

  get navOpened() {
    return this.app.openedNav
  }

}
