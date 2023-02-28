import {GetUserProfileStateInterface} from "../types/getUserProfileState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from "./actions/getUserProfile.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: GetUserProfileStateInterface = {
  isLoading: false,
  userProfile: null,
  errors: null
}

export const getUserProfileReducer = createReducer(
  initialState,
  on(getUserProfileAction,
    (state: GetUserProfileStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(getUserProfileSuccessAction,
    (state: GetUserProfileStateInterface, action) => ({
      ...state,
      isLoading: false,
      userProfile: action.userProfile
    })
  ),
  on(getUserProfileFailureAction,
    (state: GetUserProfileStateInterface, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors
    })
  ),
  on(routerNavigationAction, (state: GetUserProfileStateInterface) => initialState)
)

export function reducers(state: GetUserProfileStateInterface, action: Action) {
  return getUserProfileReducer(state, action)
}
