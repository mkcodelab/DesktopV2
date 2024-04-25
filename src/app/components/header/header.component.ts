import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface NavItem {
  name: string;
  url: string;
}

@Component({
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  app: AppComponent = inject(AppComponent);

  navItems: NavItem[] = [
    { name: 'route1', url: 'route1' },
    { name: 'APOD', url: 'apod' },
    { name: 'reactive form', url: 'reactive-form' },
    { name: 'NASA Images', url: 'nasa-images' },
  ];

  openNavModal() {
    this.app.openNavModal();
  }

  get navOpened() {
    return this.app.openedNav;
  }
}
