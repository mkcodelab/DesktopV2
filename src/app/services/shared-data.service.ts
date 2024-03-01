import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject = new Subject<string>();

  setData(data: string) {
    this.dataSubject.next(data);
  }
  getData(): Observable<string> {
    return this.dataSubject.asObservable();
  }
  clearData() {
    console.warn('data cleared');
    this.dataSubject.next('');
  }
}
