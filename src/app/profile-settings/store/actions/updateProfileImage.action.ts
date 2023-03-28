import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";

export const updateProfileImageAction = createAction(
  ActionTypes.UPDATE_PROFILE_IMAGE,
  props<{ request: FormData }>()
)

export const updateProfileImageSuccessAction = createAction(
  ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const updateProfileImageFailureAction = createAction(
  ActionTypes.UPDATE_PROFILE_IMAGE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
