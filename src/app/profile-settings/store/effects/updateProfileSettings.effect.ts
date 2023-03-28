import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  updateProfileSettingsAction,
  updateProfileSettingsFailureAction,
  updateProfileSettingsSuccessAction
} from "../actions/updateProfileSettings.action";
import {UpdateProfileSettingsService} from "../../services/update-profile-settings.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";

@Injectable()
export class UpdateArticleEffect {

  constructor(private actions$: Actions,
              private router: Router,
              private updateProfileSettingsService: UpdateProfileSettingsService) {}

  updateProfileSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfileSettingsAction),
    switchMap(({ request }) => {
      return this.updateProfileSettingsService.updateProfileSettings(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          return updateProfileSettingsSuccessAction({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateProfileSettingsFailureAction({ errors: errorResponse.error }))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
      ofType(updateProfileSettingsSuccessAction),
      tap(({ currentUser }) => {
        this.router.navigateByUrl(`/profile/${currentUser._id}`)
      })
    ),
    {dispatch: false}
  )
}
