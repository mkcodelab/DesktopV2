import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

interface NavItem {
  name: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'navmodal',
  templateUrl: './navmodal.component.html',
  styleUrls: ['./navmodal.component.scss']
})
export class NavmodalComponent implements OnInit {

  constructor(app: AppComponent) {
    this.app = app;
  }
  app: AppComponent;

  navItems: NavItem[] = [];
  
  ngOnInit(): void {
    this.populateNav(9);
  }

  closeNav() {
    if (this.app.navOpened == true) {
      this.app.navOpened = false;
    }
  }

  populateNav(count : number) {
    for (let i = 0; i < count; i++) {
      const item = {name: `item ${i}`}
      this.navItems.push(item)
    }
  }

  itemClicked(item: NavItem) {
    console.log(item)
    this.openCentralModal('test')

  }

  openCentralModal(modal: string){
    this.app.openCentralModal(modal)
  }
}
