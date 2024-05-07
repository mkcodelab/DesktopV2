import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'yt-player',
  standalone: true,
  template: `
    <iframe
      id="player"
      [src]="sanitizedSrc"
      type="text/html"
      [width]="dimensions ? dimensions.w : defaultDimensions.w"
      [height]="dimensions ? dimensions.h : defaultDimensions.h"
    ></iframe>
  `,
})
export class YoutubePlayer {
  domSanitizer = inject(DomSanitizer);

  player: any;

  defaultDimensions = {
    w: 640,
    h: 360,
  };
  sanitizedSrc: SafeResourceUrl;

  @Input() src: string;
  @Input() dimensions: { w: number; h: number };

  ngOnInit() {
    this.createPlayer();
  }

  createPlayer() {
    this.sanitizedSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.src
    );
    //@ts-ignore
    this.player = new window['YT'].Player('player');
  }
}
