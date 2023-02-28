import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import {UserProfileService} from "../../services/user-profile.service";
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from "../actions/getUserProfile.action";
import {GetUserProfileResponseInterface} from "../../types/getUserProfileResponse.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GetUserProfileEffect {

  constructor(private actions$: Actions,
              private userProfileService: UserProfileService) {}

  getUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getUserProfileAction),
    switchMap(({ slug }) => {
      return this.userProfileService.getUserProfile(slug).pipe(
        map((userProfile: GetUserProfileResponseInterface) => {
          return getUserProfileSuccessAction({ userProfile })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getUserProfileFailureAction({ errors: errorResponse.error }))
        })
      )
    })
  ))
}
