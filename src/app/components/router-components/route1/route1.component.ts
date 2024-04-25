import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RadialMenuComponent } from '../../radial-menu/radial-menu.component';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [RadialMenuComponent, NgFor],
  template: `
    <p class="p-10 bg-slate-500 absolute">{{ title }} component</p>
    <div class="flex justify-center mt-20">
      <radial-menu [radius]="80" [buttonRadius]="40" [hasBackdrop]="true">
        <button
          #radialItem
          class="bg-slate-500/70 hover:bg-cyan-200/60 text-white p-2 rounded-full"
          style="width: 60px; height: 60px;"
          *ngFor="let item of radialItems"
        >
          {{ item }}
        </button>
      </radial-menu>
    </div>
  `,
})
export class Route1Component {
  title: string = '';

  radialItems = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'];

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  routeSubscription: Subscription;

  ngOnInit() {
    console.log(this.activatedRoute);
    this.routeSubscription = this.activatedRoute.data.subscribe((data) => {
      this.title = data['title'];
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
