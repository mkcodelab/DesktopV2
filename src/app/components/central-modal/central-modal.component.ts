import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UsernamesComponent } from '../usernames/usernames.component';
import { TasksComponent } from '../tasks/tasks.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, UsernamesComponent, TasksComponent],
  selector: 'central-modal',
  templateUrl: './central-modal.component.html',
  styleUrls: ['./central-modal.component.scss'],
})
export class CentralModalComponent implements OnInit {
  constructor(app: AppComponent) {
    this.app = app;
  }

  app: AppComponent;

  showUsernames = false;

  @Input()
  title = '';

  @Input({ required: true })
  modalName = '';

  ngOnInit(): void {}

  closeModal() {
    this.app.closeCentralModal(this.modalName);
  }

  toggleShowUsernames() {
    this.showUsernames = !this.showUsernames;
  }
}
