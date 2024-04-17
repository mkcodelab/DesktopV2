import { AsyncPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorage } from '../../decorators/localStorage.decorator';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgStyle, NgClass],
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  protected localStorageService = inject(LocalStorageService);
  private ref = inject(ChangeDetectorRef);

  @LocalStorage(true, 'timerColor') timerColor!: string | null;

  protected timerColorPallete: string[] = [
    '00ffff',
    'ff00ff',
    'ffff00',
    'ff0000',
    '00ff00',
    '0000ff',
  ];

  protected timerMenuOpened = false;

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(this.getTime()), 1000);
  });

  getTime() {
    let date = new Date();
    let h = date.getHours().toString().padStart(2, '0');
    let m = date.getMinutes().toString().padStart(2, '0');
    let s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  toggleTimerMenu() {
    this.timerMenuOpened = !this.timerMenuOpened;
  }

  setTimerColor(color: string) {
    this.timerColor = color;
  }
}
