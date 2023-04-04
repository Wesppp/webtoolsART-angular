import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PopularCategoriesStateInterface} from "../types/popularCategoriesState.interface";

export const popularCategoriesFeatureSelector = createFeatureSelector<PopularCategoriesStateInterface>('popular-categories')

export const isLoadingSelector = createSelector(
  popularCategoriesFeatureSelector,
  (popularCategoriesState: PopularCategoriesStateInterface) => popularCategoriesState.isLoading
)

export const categoriesSelector = createSelector(
  popularCategoriesFeatureSelector,
  (popularCategoriesState: PopularCategoriesStateInterface) => popularCategoriesState.categories
)
