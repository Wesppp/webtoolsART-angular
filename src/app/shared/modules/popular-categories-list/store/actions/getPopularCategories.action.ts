import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const getPopularCategoriesAction = createAction(
  ActionTypes.GET_POPULAR_CATEGORIES
)

export const getPopularCategoriesSuccessAction = createAction(
  ActionTypes.GET_POPULAR_CATEGORIES_SUCCESS,
  props<{ categories: string[] }>()
)

export const getPopularCategoriesFailureAction = createAction(
  ActionTypes.GET_POPULAR_CATEGORIES_FAILURE
)
