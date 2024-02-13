import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  constructor() {}

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(this.getTime()), 1000);
  });

  getTime() {
    let date = new Date();
    let h = date.getHours().toString().padStart(2, '0');
    let m = date.getMinutes().toString().padStart(2, '0');
    let s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
    // const parts = [...document.querySelectorAll('#hour,#minute,#seconds')]
    // setInterval(() => {
    //  new Date().toTimeString().split(' ')[0].split(':').forEach( (part, i) => parts[i].textContent = part)
    // }, 1000)
  }
}
