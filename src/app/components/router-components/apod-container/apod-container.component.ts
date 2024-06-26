import { Component, inject } from '@angular/core';
import { APODService, ApodObject } from '../../../services/apod.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { YoutubePlayer } from '../../youtube-player/youtube-player.component';

@Component({
  selector: 'apod-container',
  standalone: true,
  templateUrl: './apod-container.html',
  imports: [NgIf, YoutubePlayer],
})
export class ApodContainerComponent {
  videoSrc = 'https://www.youtube.com/embed/SkoI_VHtcTU?si=Y-sOrHOtjQZ27fdk';
  data: ApodObject;
  apodSvc = inject(APODService);

  activatedRoute = inject(ActivatedRoute);

  hdImage: string | undefined;

  showLightbox = false;

  ngOnInit() {
    // this.apodSvc.getData().subscribe((data) => {
    //   this.data = data;
    // });
    // data from resolver function
    this.activatedRoute.data.subscribe(({ apodObject }) => {
      this.data = apodObject;
    });

    this.getHDImage();
  }

  get contentUrl() {
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

  get mediaType() {
    return this.data?.media_type;
  }
}
