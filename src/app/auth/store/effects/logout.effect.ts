import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { PersistanceService } from "../../../shared/services/persistance.service";
import { logoutAction } from "../actions/logout.action";

@Injectable()
export class LogoutEffect {

  constructor(private actions$: Actions,
              private router: Router,
              private persistenceService: PersistanceService) {}

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.persistenceService.set('accessToken', '')
        this.router.navigateByUrl('/login')
      })
    ),
    {dispatch: false}
  )
}
