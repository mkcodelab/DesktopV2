import { Directive, ElementRef, Renderer2, inject } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[checkRender]'
})
export class CheckRenderDirective {

  // constructor(private elementRef: ElementRef) { }
  elementRef = inject(ElementRef)
  renderer = inject(Renderer2)

  ngAfterViewInit() {
    console.log(this.elementRef)



    const div = this.renderer.createElement('div')
    div.innerHTML = 'checkRender: ${checkRender()}'
    const nativeElem = this.elementRef.nativeElement
    this.renderer.appendChild(nativeElem, div)

  }

}