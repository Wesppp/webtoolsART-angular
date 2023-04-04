import { Injectable } from '@angular/core';
import { PersistanceService } from "./persistance.service";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from "@ngrx/store";
import { logoutAction } from "../../auth/store/actions/logout.action";

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService {

  constructor(private persistanceService: PersistanceService,
              private jwtHelperService: JwtHelperService,
              private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get('accessToken');

    if (token && this.jwtHelperService.isTokenExpired(token)) {
      this.store.dispatch(logoutAction())
      return next.handle(request)
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request).pipe(
      tap(
        () => {},
        error => {
          if (error.status === 401) {
            this.store.dispatch(logoutAction())
          }
        }
      )
    );
  }
}
