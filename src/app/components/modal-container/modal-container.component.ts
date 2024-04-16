import { Component, inject } from '@angular/core';
import { ModalService } from './modal.service';
import { CentralModalComponent } from '../central-modal/central-modal.component';
import { TabsContainerComponent } from '../tab/tabs-container.component';
import { TabComponent } from '../tab/tab.component';
import { NgIf } from '@angular/common';
import { TasksComponent } from '../tasks/tasks.component';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  standalone: true,
  selector: 'modal-container',
  imports: [
    NgIf,
    CentralModalComponent,
    TabsContainerComponent,
    TabComponent,
    TasksComponent,
    LogInComponent,
  ],
  templateUrl: './modal-container.html',
})
export class ModalContainerComponent {
  modalService = inject(ModalService);

  isModalOpened(modalName: string) {
    return this.modalService.isModalOpened(modalName);
  }
}
