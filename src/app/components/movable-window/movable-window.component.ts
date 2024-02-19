import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  standalone: true,

  selector: 'movable-window',
  templateUrl: './movable-window.component.html',
  styleUrls: ['./movable-window.component.scss']
})
export class MovableWindowComponent implements OnInit {

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  protected position = { x: 0, y: 0}

  protected isMoving = false

  private offset = {
    x: 0,
    y: 0,
  }

  private el = this.element.nativeElement

  @Output() close = new EventEmitter()

  ngOnInit(): void {
  }

  dragStart(event: MouseEvent){

    this.offset.x = event.offsetX;
    this.offset.y = event.offsetY;

    this.isMoving = true

  }

  updatePosition(event: MouseEvent) {

    if (this.isMoving) {

      this.position.x =  event.clientX;
      this.position.y = event.clientY;
  
      this.renderer.setStyle(this.el, 'top', this.position.y - this.offset.y + 'px')
      this.renderer.setStyle(this.el, 'left', this.position.x - this.offset.x + 'px')
     
    }
  }



}
