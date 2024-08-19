import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, tap } from 'rxjs';

export interface RandomDataResponse {
  first_name: string;
  dish: string;
  capital: string;
}

@Injectable({
  providedIn: 'root',
})
export class RxjsRandomApiService {
  endpoint = 'https://random-data-api.com/api/';

  http = inject(HttpClient);

  randomFirstName$ = this.http
    .get<RandomDataResponse>(`${this.endpoint}name/random_name`)
    .pipe(map((response) => response.first_name));

  randomCapital$ = this.http
    .get<RandomDataResponse>(`${this.endpoint}nation/random_nation`)
    .pipe(
      //   tap((response) => console.log(response)),
      map((response) => response.capital)
    );

  randomDish$ = this.http
    .get<RandomDataResponse>(`${this.endpoint}food/random_food`)
    .pipe(map((response) => response.dish));

  getJoinedData() {
    return forkJoin([
      this.randomFirstName$,
      this.randomCapital$,
      this.randomDish$,
    ]);
  }
}
