import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UsernamesComponent } from '../usernames/usernames.component';

@Component({
  standalone: true,
  imports: [UsernamesComponent],
  selector: 'central-modal',
  templateUrl: './central-modal.component.html',
  styleUrls: ['./central-modal.component.scss']
})
export class CentralModalComponent implements OnInit {

  app: AppComponent

  constructor(app: AppComponent) {
    this.app = app;
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.app.centralModalOpened = false;
  }
}
