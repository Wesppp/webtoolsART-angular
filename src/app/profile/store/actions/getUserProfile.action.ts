import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { GetUserProfileResponseInterface } from "../../types/getUserProfileResponse.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{ slug: string }>()
)

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: GetUserProfileResponseInterface }>()
)

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
