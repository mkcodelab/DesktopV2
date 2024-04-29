import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'image-card',
  imports: [NgIf],
  templateUrl: './image-card.html',
})
export class ImageCardComponent {
  @Input() imageUrl: string;
  @Input() description: string;
}
