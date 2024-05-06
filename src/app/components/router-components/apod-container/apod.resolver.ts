import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { APODService, ApodObject } from '../../../services/apod.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const ApodResolverFn: ResolveFn<ApodObject> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<ApodObject> => {
  return inject(APODService).getData();
};
