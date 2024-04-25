import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  inject,
} from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

// usage
// projected items must be referenced as #radialItem
/*

    <radial-menu [radius]='100'>
        <button #radialItem></button>
        <button #radialItem></button>
        <button #radialItem></button>
    </radial-menu>

*/

@Component({
  standalone: true,
  selector: 'radial-menu',
  templateUrl: './radial-menu.html',
  imports: [],
})
export class RadialMenuComponent implements AfterContentInit {
  @Input() radius: number = 40;
  menuText = 'menu';

  isMenuOpen = false;

  private renderer = inject(Renderer2);

  //   @ContentChildren(RadialMenuItem) children: QueryList<RadialMenuItem>;

  @ContentChildren('radialItem') children: QueryList<ElementRef>;

  ngAfterContentInit(): void {
    this.circularDistribution();
  }

  toggleRadialMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuText = this.isMenuOpen ? 'x' : 'O';
  }

  circularDistribution() {
    const step = (2 * Math.PI) / this.children.length;
    let angle = (-90 * Math.PI) / this.children.length;

    this.children.forEach((child, index) => {
      const x = Math.round(this.radius * Math.cos(angle));
      const y = Math.round(this.radius * Math.sin(angle));
      const el = child.nativeElement;

      this.renderer.setStyle(el, 'position', 'absolute');
      this.renderer.setStyle(el, 'transform', 'translateY(-100%)');
      this.renderer.setStyle(el, 'top', x + 'px');
      this.renderer.setStyle(el, 'left', y + 'px');
      angle -= step;
    });
  }
}
