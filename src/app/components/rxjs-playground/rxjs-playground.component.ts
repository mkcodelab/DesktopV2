import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { RxjsDataService } from './rxjs-data.service';

@Component({
  standalone: true,
  selector: 'rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
})
export class RxjsPlaygroundComponent implements OnInit, OnDestroy {
  rxjsDataSvc = inject(RxjsDataService);

  observable$ = new Observable<any>((subscriber) => {
    console.log('observable executed');
    subscriber.next('alice');
    subscriber.next('ben');
    setTimeout(() => {
      subscriber.next('charlie');
      //   subscriber.complete();
    }, 2000);
    setTimeout(() => {
      subscriber.error(new Error('error occured'));
    }, 4000);

    return () => {
      console.log('teardown');
    };
  });

  observer: Observer<any> = {
    next: (val) => console.log(val),
    error: (err) => console.error(err),
    complete: () => console.log('completed'),
  };

  intervalObservable$ = new Observable<number>((subscriber) => {
    let i = 0;
    const interval = setInterval(() => {
      console.log('interval fired');
      subscriber.next(i);
      i++;
      //   or subscriber.next(i++)
    }, 1000);

    // teardown logic to clear interval
    return () => {
      clearInterval(interval);
    };
  });

  intervalSubscription: Subscription;
  observableSubscription: Subscription;

  customOfTest = this.customOf('a', 'b', 'c');

  ngOnInit() {
    console.log('before subscription');
    this.observableSubscription = this.observable$.subscribe(this.observer);
    console.log('after subscription');

    this.intervalSubscription = this.intervalObservable$.subscribe((value) => {
      console.log(value);
    });

    setTimeout(() => {
      this.intervalSubscription.unsubscribe();
    }, 7000);

    // this.customOfTest.subscribe(console.log);

    this.rxjsDataSvc.getFeed('Sports').subscribe(console.log);
  }

  customOf(...args: string[]): Observable<string> {
    return new Observable<string>((subscriber) => {
      for (let arg of args) {
        subscriber.next(arg);
      }
      subscriber.complete();
    });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
    this.observableSubscription.unsubscribe();
  }
}
