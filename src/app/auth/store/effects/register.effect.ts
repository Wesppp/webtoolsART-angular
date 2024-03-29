import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {ClearAuthFormService} from "../../services/clear-auth-form.service";

@Injectable()
export class RegisterEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private clearAuthFormService: ClearAuthFormService) {}

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.clearAuthFormService.clearForm()
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(registerFailureAction({errors: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/login')
      })
    ),
    {dispatch: false}
  )
}
