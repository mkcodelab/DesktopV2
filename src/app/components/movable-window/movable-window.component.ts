import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  standalone: true,

  selector: 'movable-window',
  templateUrl: './movable-window.component.html',
  styleUrls: ['./movable-window.component.scss'],
})
export class MovableWindowComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private localStorageService: LocalStorageService
  ) {}

  protected position = { x: 0, y: 0 };

  protected isMoving = false;

  private offset = {
    x: 0,
    y: 0,
  };

  protected size = {
    w: 500,
    h: 500,
  };

  private el = this.element.nativeElement;

  @Output() close = new EventEmitter();

  ngOnInit(): void {
    const positionData = this.localStorageService.getItem('position');
    if (positionData !== null) {
      this.position = JSON.parse(positionData);
      this.updatePosition();
    }
  }

  dragStart(event: MouseEvent): void {
    event.preventDefault();

    this.offset.x = event.offsetX;
    this.offset.y = event.offsetY;

    this.isMoving = true;
  }

  dragStop(): void {
    this.isMoving = false;
    this.localStorageService.setItem('position', JSON.stringify(this.position));
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMoving) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
      this.updatePosition();
    }
  }

  updatePosition(): void {
    this.renderer.setStyle(
      this.el,
      'top',
      this.position.y - this.offset.y + 'px'
    );
    this.renderer.setStyle(
      this.el,
      'left',
      this.position.x - this.offset.x + 'px'
    );
  }
}
