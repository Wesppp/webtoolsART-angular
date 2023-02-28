import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.action";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {AuthResponseInterface} from "../../types/authResponse.interface";

@Injectable()
export class LoginEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private persistenceService: PersistanceService) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) => {
      return this.authService.login(request).pipe(
        map((authResponse: AuthResponseInterface) => {
          this.persistenceService.set('accessToken', authResponse.token)
          const currentUser: CurrentUserInterface = authResponse.user
          return loginSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )
}
