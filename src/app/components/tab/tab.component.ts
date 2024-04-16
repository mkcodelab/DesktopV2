import { Component, Input } from '@angular/core';
import { TabsContainerComponent } from './tabs-container.component';

@Component({
  standalone: true,
  selector: 'tab',
  imports: [],
  template: `
    <div [hidden]="!active" class="p-2 bg-slate-200 w-full">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabComponent {
  active = false;
  //hierarchical dependency injection
  constructor(tabs: TabsContainerComponent) {
    tabs.addTab(this);
  }
  @Input({ required: true }) title: string;
}
