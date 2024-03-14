import { Routes } from '@angular/router';
import { Route1Component } from './components/router-components/route1/route1.component';

export const routes: Routes = [
  { path: 'route1', component: Route1Component, data: { title: 'route1 comp' } },
  { path: 'route2', component: Route1Component, data: { title: 'route2 comp' } },
  { path: 'route3', component: Route1Component, data: { title: 'route3 comp' } },
  { path: 'route4', component: Route1Component, data: { title: 'route4 comp' } },
];
