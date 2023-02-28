import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of, tap} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {isAnonymousSelector, isLoggedInSelector} from "./store/selectors";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAnonymous$ = this.store.pipe(select(isAnonymousSelector))

    isAnonymous$.subscribe(
      (isAnonymous: boolean) => {
        if (!isAnonymous) { this.router.navigateByUrl('/') }
      }
    )

    return isAnonymous$
  }

}
