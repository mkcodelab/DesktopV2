import { Routes } from '@angular/router';
import { Route1Component } from './components/router-components/route1/route1.component';
import { ApodContainerComponent } from './components/router-components/apod-container/apod-container.component';
import { ReactiveFormComponent } from './components/router-components/reactive-form-component/reactive-form.component';

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
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
    data: { title: 'reactive form' },
  },
  {
    path: 'route4',
    component: Route1Component,
    data: { title: 'route4 comp' },
  },
];
