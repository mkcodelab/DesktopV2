import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CheckRender } from '../decorators/check-render.decorator';

@Component({
  standalone: true,
  selector: 'background',
  template: `<img
      class="h-full w-full absolute z-0"
      [src]="'https://picsum.photos/id/' + this.id + '/1600/800'"
      alt="background"
    />
    <div class="absolute z-20 bottom-0 right-0 mb-2 mr-2">
      <button
        class="w-6 h-6 rounded-lg bg-slate-500 mr-2"
        (click)="previousPicture()"
        title="previous image"
      >
        <
      </button>
      <button
        class="w-6 h-6 rounded-lg bg-slate-500"
        (click)="nextPicture()"
        title="next image"
      >
        >
      </button>
    </div>`,
})
@CheckRender()
// @CheckRender
export class BackgroundComponent implements OnInit {


  localStorageService = inject(LocalStorageService);

  id = 0;

  maxId = 400;

  ngOnInit(): void {
    const _id = this.localStorageService.getItem('backgroundImageId');
    if (_id !== null) {
      this.id = Number(_id);
    }
  }

  nextPicture() {
    if (this.id < this.maxId) {
      this.id++;
      this.savePicture();
    }
  }

  previousPicture() {
    if (this.id > 0) {
      this.id--;
      this.savePicture();
    }
  }

  savePicture() {
    this.localStorageService.setItem('backgroundImageId', this.id.toString());
  }
}
