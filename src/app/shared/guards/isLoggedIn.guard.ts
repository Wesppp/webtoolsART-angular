import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import { isLoggedInSelector } from "../../auth/store/selectors";

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private store: Store,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))

    isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        if (!isLoggedIn) { this.router.navigateByUrl('/') }
      }
    )

    return isLoggedIn$
  }
}
