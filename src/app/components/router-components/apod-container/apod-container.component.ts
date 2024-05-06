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

  hdImage: string | undefined;

  showLightbox = false;

  ngOnInit() {
    this.apodSvc.getData().subscribe((data) => {
      this.data = data;
    });

    this.getHDImage();
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
    return this.hdImage;
  }

  getHDImage() {
    return this.apodSvc.getHDPicture().subscribe((image) => {
      this.hdImage = image;
    });
  }

  get apodDate() {
    return this.data?.date;
  }

  get title() {
    return this.data?.title;
  }
}
