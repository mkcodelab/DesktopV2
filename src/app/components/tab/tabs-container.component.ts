import { Component } from '@angular/core';
import { TabComponent } from './tab.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'tabs-container',
  imports: [NgFor, NgClass],
  template: `
    <ul class="flex">
      <button
        class="p-2 bg-slate-500 mr-1 ml-1"
        [ngClass]="{
          'bg-yellow-200': tab.active,
          'mr-1': !isLast,
          'ml-1': !isFirst
        }"
        *ngFor="let tab of tabs; let isLast = last; let isFirst = first"
        (click)="selectTab(tab)"
      >
        {{ tab.title }}
      </button>
    </ul>
    <ng-content></ng-content>
  `,
})
export class TabsContainerComponent {
  tabs: TabComponent[] = [];

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: TabComponent) {
    // deactivate all
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    // activate selected one
    tab.active = true;
  }
}
