import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CentralModalComponent } from './components/central-modal/central-modal.component';
import { CentralBottomPanelComponent } from './components/central-bottom-panel/central-bottom-panel.component';
import { TimerComponent } from './components/timer/timer.component';
import { NavmodalComponent } from './components/navmodal/navmodal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CentralModalComponent,
    CentralBottomPanelComponent,
    NavmodalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'desktopV2';

  navOpened: boolean = false;
  canCloseModal: boolean = false;

  centralModalOpened: boolean = false;

  openCentralModal(modal: string) {
    console.log(modal);
    this.centralModalOpened = true;
  }

  openNavModal() {
    this.navOpened = true;
    setTimeout(() => (this.canCloseModal = true), 500);
  }

  closeNavModal() {
    if (this.canCloseModal) {
      this.navOpened = false;
      this.canCloseModal = false;
    }
  }
}
