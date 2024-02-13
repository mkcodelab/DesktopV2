import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'central-bottom-panel',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './central-bottom-panel.component.html',
  styleUrls: ['./central-bottom-panel.component.scss']
})
export class CentralBottomPanelComponent {}
