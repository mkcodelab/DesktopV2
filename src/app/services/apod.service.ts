// APOD https://github.com/nasa/apod-api

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApodObject {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class APODService {
  api_key = environment.apiKey || 'DEMO_CODE';

  url = 'https://api.nasa.gov/planetary/apod';

  http = inject(HttpClient);
  getData(): Observable<ApodObject> {
    let apiParams = new HttpParams().set('api_key', this.api_key);
    return this.http.get<ApodObject>(this.url, { params: apiParams });
  }
}
