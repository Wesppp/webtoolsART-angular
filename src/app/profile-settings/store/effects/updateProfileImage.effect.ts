import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UpdateProfileSettingsService } from "../../services/update-profile-settings.service";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import {
  updateProfileImageAction,
  updateProfileImageFailureAction,
  updateProfileImageSuccessAction
} from "../actions/updateProfileImage.action";

@Injectable()
export class UpdateProfileImageEffect {

  constructor(private actions$: Actions,
              private router: Router,
              private updateProfileSettingsService: UpdateProfileSettingsService) {}

  updateProfileImage$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfileImageAction),
    switchMap(({ request }) => {
      return this.updateProfileSettingsService.updateProfileImage(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          return updateProfileImageSuccessAction({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateProfileImageFailureAction({ errors: errorResponse.error }))
        })
      )
    })
  ))
}
