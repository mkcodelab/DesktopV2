import { Routes } from '@angular/router';
import { Route1Component } from './components/router-components/route1/route1.component';
import { ApodContainerComponent } from './components/router-components/apod-container/apod-container.component';
import { ReactiveFormComponent } from './components/router-components/reactive-form-component/reactive-form.component';
import { NasaImagesComponent } from './components/router-components/nasa-images/nasa-images.component';
import { ApodResolverFn } from './components/router-components/apod-container/apod.resolver';
import { RxjsPlaygroundComponent } from './components/rxjs-playground/rxjs-playground.component';

export const routes: Routes = [
  {
    path: 'route1',
    component: Route1Component,
    data: { title: 'route1 comp' },
  },
  {
    path: 'apod',
    component: ApodContainerComponent,
    data: { title: 'APOD' },
    resolve: { apodObject: ApodResolverFn },
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
    data: { title: 'reactive form' },
  },
  {
    path: 'nasa-images',
    component: NasaImagesComponent,
    data: { title: 'NASA Images' },
  },
  {
    path: 'rxjs-playground',
    component: RxjsPlaygroundComponent,
    data: { title: 'RxJs Playground' },
  },
];
