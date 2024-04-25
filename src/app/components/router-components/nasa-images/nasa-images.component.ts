import { Component, inject } from '@angular/core';
import {
  Items,
  NasaImagesService,
} from '../../../services/nasa-images.service';
import { FormsModule } from '@angular/forms';
import { ImageCardComponent } from '../../image-card/image-card.component';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ImageCardComponent, NgFor],
  selector: 'nasa-images',
  templateUrl: './nasa-images.html',
})
export class NasaImagesComponent {
  private search = 'search?q=';
  searchInput = '';
  pageSize = 20;

  cards: Items[] = [];

  private nasaImagesSvc = inject(NasaImagesService);

  getData() {
    this.nasaImagesSvc
      .getData(
        this.search + this.searchInput + '&' + 'page_size=' + this.pageSize
      )
      .subscribe((data) => {
        // console.log(data);
        this.cards = data.collection.items;
        console.log(this.cards);
      });
  }
}
