import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { TestComponentA } from '../test-component/test-componentA.component';
import { ModalService } from '../modal-container/modal.service';

@Component({
  standalone: true,
  imports: [CommonModule, TestComponentA],
  selector: 'navmodal',
  templateUrl: './navmodal.component.html',
})
export class NavmodalComponent {
  constructor(app: AppComponent) {
    this.app = app;
  }
  app: AppComponent;
  private modalService: ModalService = inject(ModalService);

  closeNav() {
    this.app.closeNavModal();
  }

  openCentralModal(modal: string) {
    this.modalService.openCentralModal(modal);
  }

  openMovableWindow(windowName: string) {
    this.app.openMovableWindow(windowName);
  }
}
