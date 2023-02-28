import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GetUserProfileStateInterface } from "../types/getUserProfileState.interface";

export const userProfileFeatureSelector = createFeatureSelector<GetUserProfileStateInterface>('user-profile')

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (getUserProfileState: GetUserProfileStateInterface) => getUserProfileState.isLoading
)

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (getUserProfileState: GetUserProfileStateInterface) => getUserProfileState.userProfile
)

export const backendErrorsSelector = createSelector(
  userProfileFeatureSelector,
  (getUserProfileState: GetUserProfileStateInterface) => getUserProfileState.errors
)
