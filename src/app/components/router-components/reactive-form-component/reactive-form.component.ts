import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'reactive-form',
  template: `<input id="name" type="text" [formControl]="name" /> `,
  imports: [ReactiveFormsModule],
})
export class ReactiveFormComponent {
  name = new FormControl('');

  ngOnInit() {}
}
