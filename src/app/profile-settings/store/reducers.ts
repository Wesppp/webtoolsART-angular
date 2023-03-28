import { UpdateProfileSettingsStateInterface } from "../types/updateProfileSettingsState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import {
  updateProfileSettingsAction,
  updateProfileSettingsFailureAction,
  updateProfileSettingsSuccessAction
} from "./actions/updateProfileSettings.action";
import {
  updateProfileImageAction,
  updateProfileImageFailureAction,
  updateProfileImageSuccessAction
} from "./actions/updateProfileImage.action";
import { getCurrentUserSuccessAction } from "../../auth/store/actions/getCurrentUser.action";
import { routerNavigationAction } from "@ngrx/router-store";
import {
  deleteProfileImageAction,
  deleteProfileImageFailureAction,
  deleteProfileImageSuccessAction
} from "./actions/deleteProfileImage.action";

const initialState: UpdateProfileSettingsStateInterface = {
  isSubmitting: false,
  currentUser: null,
  errors: null
}

export const updateProfileSettingsReducer = createReducer(
  initialState,
  on(getCurrentUserSuccessAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      currentUser: action.currentUser
    })
  ),
  on(updateProfileSettingsAction,
    (state: UpdateProfileSettingsStateInterface) => ({
      ...state,
      isSubmitting: true,
      errors: null
    })
  ),
  on(updateProfileSettingsSuccessAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })
  ),
  on(updateProfileSettingsFailureAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(updateProfileImageAction,
    (state: UpdateProfileSettingsStateInterface) => ({
      ...state,
      isSubmitting: true,
      errors: null
    })
  ),
  on(updateProfileImageSuccessAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })
  ),
  on(updateProfileImageFailureAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(deleteProfileImageAction,
    (state: UpdateProfileSettingsStateInterface) => ({
      ...state,
      isSubmitting: true,
      errors: null
    })
  ),
  on(deleteProfileImageSuccessAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })
  ),
  on(deleteProfileImageFailureAction,
    (state: UpdateProfileSettingsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(routerNavigationAction, (state: UpdateProfileSettingsStateInterface) => initialState)
)

export function reducers(state: UpdateProfileSettingsStateInterface, action: Action) {
  return updateProfileSettingsReducer(state, action)
}
