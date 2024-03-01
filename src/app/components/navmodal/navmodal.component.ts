import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { TestComponentA } from '../test-component/test-componentA.component';

interface NavItem {
  name: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, TestComponentA],
  selector: 'navmodal',
  templateUrl: './navmodal.component.html',
  // styleUrls: ['./navmodal.component.scss'],
})
export class NavmodalComponent {
  constructor(app: AppComponent) {
    this.app = app;
  }
  app: AppComponent;

  closeNav() {
    this.app.closeNavModal();
  }

  itemClicked(item: NavItem) {
    console.log(item);
    this.openCentralModal('test');
  }

  // change those for signals / observables

  openCentralModal(modal: string) {
    this.app.openCentralModal(modal);
  }

  openMovableWindow(windowName: string) {
    this.app.openMovableWindow(windowName);
  }
}
