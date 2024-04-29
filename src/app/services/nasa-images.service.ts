import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

type NasaResponse = {
  collection: {
    href: string;
    items: Items[];
  };
};

export type Items = {
  data: [];
  links: Links[];
};

export type Links = {
  href: string;
};

@Injectable({
  providedIn: 'root',
})
export class NasaImagesService {
  private baseUrl = 'https://images-api.nasa.gov/';

  private http = inject(HttpClient);
  getData(params: string): Observable<NasaResponse> {
    return this.http.get<NasaResponse>(this.baseUrl + params);
  }
}
