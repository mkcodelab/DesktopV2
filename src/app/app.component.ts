import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CentralModalComponent } from './components/central-modal/central-modal.component';
import { CentralBottomPanelComponent } from './components/central-bottom-panel/central-bottom-panel.component';
import { NavmodalComponent } from './components/navmodal/navmodal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './components/tasks/tasks.component';
import { MovableWindowComponent } from './components/movable-window/movable-window.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { BackgroundComponent } from './components/background/background.component';
import { TestComponentB } from './components/test-component/test-componentB.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsContainerComponent } from './components/tab/tabs-container.component';
import { TabComponent } from './components/tab/tab.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ExternalScriptService } from './services/externalScript.service';

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
    ClickOutsideDirective,
    BackgroundComponent,
    TestComponentB,
    LogInComponent,
    HeaderComponent,
    TabsContainerComponent,
    TabComponent,
    ModalContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient],
})
export class AppComponent {
  ytApiUrl = 'https://www.youtube.com/iframe_api';
  title = 'desktopV2';

  protected navOpened = false;
  protected canCloseModal = false;

  //   move it to movableWindowComponent / service
  protected movableWindowOpened = false;

  extScriptSvc = inject(ExternalScriptService);

  openMovableWindow(windowName: string) {
    switch (windowName) {
      case 'movable-window':
        this.movableWindowOpened = true;
        break;
      default:
        console.log('sorry, no window found');
    }
  }

  openNavModal() {
    this.navOpened = true;
    setTimeout(() => (this.canCloseModal = true), 300);
  }

  closeNavModal() {
    if (this.canCloseModal) {
      this.navOpened = false;
      this.canCloseModal = false;
    }
  }

  get openedNav(): boolean {
    return this.navOpened;
  }

  ngOnInit() {
    // yt video api script
    this.extScriptSvc.injectScript(this.ytApiUrl);
  }
}
