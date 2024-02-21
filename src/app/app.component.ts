import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CentralModalComponent } from './components/central-modal/central-modal.component';
import { CentralBottomPanelComponent } from './components/central-bottom-panel/central-bottom-panel.component';
import { NavmodalComponent } from './components/navmodal/navmodal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './components/tasks/tasks.component';
import { MovableWindowComponent } from './components/movable-window/movable-window.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    CommonModule,
    CentralModalComponent,
    CentralBottomPanelComponent,
    NavmodalComponent,
    TasksComponent,
    MovableWindowComponent,
    ClickOutsideDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient]
})
export class AppComponent {
  title = 'desktopV2';

  navOpened: boolean = false;
  canCloseModal: boolean = false;

  taskModalOpened: boolean = false;
  
  movableWindowOpened = false

  openCentralModal(modal: string) {
    switch(modal) {
      case 'tasks-modal':
        this.taskModalOpened = true;
        console.log(modal);
        break;
      default:
        console.log('Sorry, no modal with that name')
    }
      
  }

  openMovableWindow(windowName: string) {
    switch(windowName){
      case 'movable-window':
        this.movableWindowOpened = true
        break;
      default:
        console.log('sorry, no window found')
    }
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
