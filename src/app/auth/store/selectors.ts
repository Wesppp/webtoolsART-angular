import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const backendErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.errors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => !authState.isLoggedIn
)

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
)

export const currentUserRoleSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.role || 'user'
)

