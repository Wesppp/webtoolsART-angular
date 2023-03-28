import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";

export const deleteProfileImageAction = createAction(
  ActionTypes.DELETE_PROFILE_IMAGE
)

export const deleteProfileImageSuccessAction = createAction(
  ActionTypes.DELETE_PROFILE_IMAGE_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const deleteProfileImageFailureAction = createAction(
  ActionTypes.DELETE_PROFILE_IMAGE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
