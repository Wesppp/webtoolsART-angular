import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UpdateProfileSettingsService} from "../../services/update-profile-settings.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {
  deleteProfileImageAction,
  deleteProfileImageFailureAction,
  deleteProfileImageSuccessAction
} from "../actions/deleteProfileImage.action";

@Injectable()
export class DeleteProfileImageEffect {

  constructor(private actions$: Actions,
              private router: Router,
              private updateProfileSettingsService: UpdateProfileSettingsService) {}

  deleteProfileImage$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProfileImageAction),
    switchMap(() => {
      return this.updateProfileSettingsService.deleteProfileImage().pipe(
        map((currentUser: CurrentUserInterface) => {
          return deleteProfileImageSuccessAction({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(deleteProfileImageFailureAction({ errors: errorResponse.error }))
        })
      )
    })
  ))
}
