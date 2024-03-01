import { Component, inject } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'test-component-b',
  standalone: true,
  imports: [AsyncPipe],
  template: `<p>data from sharedDataService: {{ data | async }}</p>`,
})
export class TestComponentB {
  sharedDataService = inject(SharedDataService);

  // data: string = '';

  // ngOnInit() {
  //   this.sharedDataService.getData().subscribe((data) => {
  //     this.data = data;
  //   });
  // }

  data = this.sharedDataService.getData();
}
