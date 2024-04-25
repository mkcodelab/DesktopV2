import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'radial-item',
  template: `<button class="p-2 rounded-xl bg-white">{{ itemName }}</button>`,
})
export class RadialMenuItem {
  @Input({ required: true }) itemName: string;
}
