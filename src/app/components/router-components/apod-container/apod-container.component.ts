import { Component, inject } from '@angular/core';
import { APODService, ApodObject } from '../../../services/apod.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'apod-container',
  standalone: true,
  templateUrl: './apod-container.html',
  imports: [NgIf],
})
export class ApodContainerComponent {
  data: ApodObject;
  apodSvc = inject(APODService);

  showLightbox = false;

  ngOnInit() {
    this.apodSvc.getData().subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }

  get imageUrl() {
    return this.data?.url;
  }

  get description() {
    return this.data?.explanation;
  }

  enlarge() {
    this.showLightbox = true;
  }

  get hdImageUrl() {
    return this.data?.hdurl;
  }

  get apodDate() {
    return this.data?.date;
  }

  get title() {
    return this.data?.title;
  }
}
