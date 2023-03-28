import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AddToFavoritesStateInterface} from "../types/addToFavoritesState.interface";

export const addToFavoritesFeatureSelector = createFeatureSelector<AddToFavoritesStateInterface>('add-to-favorites')

export const isSubmittingSelector = createSelector(
  addToFavoritesFeatureSelector,
  (addToFavoritesState: AddToFavoritesStateInterface) => addToFavoritesState.isSubmitting
)
