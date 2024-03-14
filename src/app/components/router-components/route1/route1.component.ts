import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [],
  template: `<p class="p-10 bg-slate-500 absolute">{{title}} component</p>`
})

export class Route1Component {

  title: string = ''

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    console.log(this.activatedRoute)
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
    })
  }

}