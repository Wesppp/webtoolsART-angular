import { AuthStateInterface } from "../types/authState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import { registerAction, registerFailureAction, registerSuccessAction } from "./actions/register.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.action";
import {logoutAction} from "./actions/logout.action";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from "./actions/getCurrentUser.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
  errors: null
}

const authReducer = createReducer(
  initialState,
  on(registerAction,
    (state: AuthStateInterface) => ({
      ...state,
      isSubmitting: true,
      errors: null
    })
  ),
  on(registerSuccessAction,
    (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })
  ),
  on(registerFailureAction,
    (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(loginAction,
    (state: AuthStateInterface) => ({
      ...state,
      isSubmitting: true,
      errors: null
    })
  ),
  on(loginSuccessAction,
    (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true
    })
  ),
  on(loginFailureAction,
    (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(getCurrentUserAction,
    (state: AuthStateInterface) => ({
      ...state,
      isLoading: true,
      errors: null
    })
  ),
  on(getCurrentUserSuccessAction,
    (state: AuthStateInterface, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
      isLoggedIn: true
    })
  ),
  on(getCurrentUserFailureAction,
    (state: AuthStateInterface) => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),
  on(logoutAction,
    (state: AuthStateInterface) => ({
      ...initialState,
      isLoggedIn: false
    })
  ),
  on(routerNavigationAction,
    (state): AuthStateInterface => ({
      ...state,
      errors: null
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
