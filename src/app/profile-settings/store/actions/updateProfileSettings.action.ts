import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { UpdateProfileSettingsRequestInterface } from "../../types/updateProfileSettingsRequest.interface";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

export const updateProfileSettingsAction = createAction(
  ActionTypes.UPDATE_PROFILE_SETTINGS,
  props<{ request: UpdateProfileSettingsRequestInterface }>()
)

export const updateProfileSettingsSuccessAction = createAction(
  ActionTypes.UPDATE_PROFILE_SETTINGS_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const updateProfileSettingsFailureAction = createAction(
  ActionTypes.UPDATE_PROFILE_SETTINGS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
