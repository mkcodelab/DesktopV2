import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  catchError,
  concatMap,
  EMPTY,
  fromEvent,
  map,
  Observable,
  Observer,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { RxjsDataService } from './rxjs-data.service';
import { RxjsRandomApiService } from './rxjs-random-api.service';

@Component({
  standalone: true,
  selector: 'rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
})
export class RxjsPlaygroundComponent implements OnInit, OnDestroy {
  rxjsDataSvc = inject(RxjsDataService);

  rxjsRandomApiSvc = inject(RxjsRandomApiService);

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

  @ViewChild('endpointInput')
  endpointInputElement: ElementRef;

  @ViewChild('fetchButton') fetchButtonElement: ElementRef;

  fetchButtonClick$: Observable<Object>;

  ngOnInit() {
    // console.log('before subscription');
    // this.observableSubscription = this.observable$.subscribe(this.observer);
    // console.log('after subscription');

    // this.intervalSubscription = this.intervalObservable$.subscribe((value) => {
    //   console.log(value);
    // });

    // setTimeout(() => {
    //   this.intervalSubscription.unsubscribe();
    // }, 7000);

    // this.customOfTest.subscribe(console.log);

    this.rxjsDataSvc.getFeed('Sports').subscribe(console.log);

    this.rxjsRandomApiSvc
      .getJoinedData()
      .subscribe(([firstName, capital, dish]) => {
        console.log(`${firstName} is from ${capital} and likes to eat ${dish}`);
      });
  }

  ngAfterViewInit() {
    //   console.log('input: ', this.endpointInputElement.nativeElement);
    //   console.log('input value:', this.endpointInputElement.nativeElement.value);
    this.fetchButtonClick$ = fromEvent(
      this.fetchButtonElement.nativeElement,
      'click'
    ).pipe(
      tap(() => console.log('clicked event fired')),
      map(() => this.endpointInputElement.nativeElement.value),
      tap((value) => console.log(value)),
      concatMap((value) =>
        this.rxjsRandomApiSvc
          .getDataFromEndpoint(value)
          //   if error occures, it completes the inner observable but outer is still subscribed
          .pipe(
            catchError((error) => of(`Could not fetch data: ${error.message}`))
          )
      )
      //   catchError(() => EMPTY)
    );

    this.fetchButtonClick$.subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
    });
  }

  customOf(...args: string[]): Observable<string> {
    return new Observable<string>((subscriber) => {
      for (let arg of args) {
        subscriber.next(arg);
      }
      subscriber.complete();
    });
  }

  onFetchButtonClicked() {
    console.log('input value', this.endpointInputElement.nativeElement.value);
  }

  ngOnDestroy() {
    // this.intervalSubscription.unsubscribe();
    // this.observableSubscription.unsubscribe();
  }
}
