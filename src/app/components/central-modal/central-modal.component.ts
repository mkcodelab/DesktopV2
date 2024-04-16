import { Component, Input } from '@angular/core';
import { UsernamesComponent } from '../usernames/usernames.component';
import { TasksComponent } from '../tasks/tasks.component';
import { NgIf } from '@angular/common';
import { ModalService } from '../modal-container/modal.service';

@Component({
  standalone: true,
  imports: [NgIf, UsernamesComponent, TasksComponent],
  selector: 'central-modal',
  templateUrl: './central-modal.component.html',
  styleUrls: ['./central-modal.component.scss'],
})
export class CentralModalComponent {
  constructor(private modalService: ModalService) {
    this.modalService = modalService;
  }

  ngOnInit() {
    // has to be registered onInit, because there is no modalName initialized in constructor
    this.modalService.registerModal(this.modalName);
  }

  @Input()
  title = '';

  @Input({ required: true })
  modalName: string;

  closeModal() {
    this.modalService.closeCentralModal(this.modalName);
  }
}
