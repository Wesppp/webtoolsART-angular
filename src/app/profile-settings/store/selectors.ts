import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UpdateProfileSettingsStateInterface} from "../types/updateProfileSettingsState.interface";

export const updateProfileSettingsFeatureSelector = createFeatureSelector
  <UpdateProfileSettingsStateInterface>('update-profile-settings')

export const isSubmittingSelector = createSelector(
  updateProfileSettingsFeatureSelector,
  (updateProfileSettingsState: UpdateProfileSettingsStateInterface) => updateProfileSettingsState.isSubmitting
)

export const currentUserSelector = createSelector(
  updateProfileSettingsFeatureSelector,
  (updateProfileSettingsState: UpdateProfileSettingsStateInterface) => updateProfileSettingsState.currentUser
)

export const backendErrorsSelector = createSelector(
  updateProfileSettingsFeatureSelector,
  (updateProfileSettingsState: UpdateProfileSettingsStateInterface) => updateProfileSettingsState.errors
)
