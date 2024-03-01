import { Component, inject } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'test-component-a',
  standalone: true,
  imports: [],
  template: `<button class="p-2 bg-slate-500 mb-1" (click)="sendData(message)">
      send data
    </button>
    <br />
    <button class="p-2 bg-slate-500" (click)="clearData()">clear data</button>`,
})
export class TestComponentA {
  sharedDataService = inject(SharedDataService);

  message: string = 'testing component communication via service';

  sendData(data: string) {
    this.sharedDataService.setData(data);
  }

  clearData() {
    this.sharedDataService.clearData();
  }
}
