import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

export interface NewsItem {
  category: 'Business' | 'Sports';
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class RxjsDataService {
  // fake async data
  newsFeed$ = new Observable<NewsItem>((subscriber) => {
    setTimeout(() => {
      subscriber.next({ category: 'Sports', content: 'A' });
    }, 1000);
    setTimeout(() => {
      subscriber.next({ category: 'Business', content: 'B' });
    }, 2000);
    setTimeout(() => {
      subscriber.next({ category: 'Sports', content: 'C' });
    }, 3000);
    setTimeout(() => {
      subscriber.next({ category: 'Business', content: 'D' });
    }, 4000);
    setTimeout(() => {
      subscriber.next({ category: 'Business', content: 'E' });
    }, 5000);
    setTimeout(() => {
      subscriber.next({ category: 'Sports', content: 'F' });
    }, 6000);
  });

  getFeed(feedType: NewsItem['category']) {
    return this.newsFeed$.pipe(filter((item) => item.category === feedType));
  }
}
