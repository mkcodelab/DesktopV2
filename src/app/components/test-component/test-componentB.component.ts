import { Component, OnInit, inject } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'test-component-b',
  standalone: true,
  imports: [],
  template: `<p>data from sharedDataService: {{ data }}</p>`,
})
export class TestComponentB implements OnInit {
  sharedDataService = inject(SharedDataService);

  data: string = '';

  ngOnInit() {
    this.sharedDataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
