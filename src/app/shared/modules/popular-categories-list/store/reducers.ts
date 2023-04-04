import {PopularCategoriesStateInterface} from "../types/popularCategoriesState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  getPopularCategoriesAction,
  getPopularCategoriesFailureAction,
  getPopularCategoriesSuccessAction
} from "./actions/getPopularCategories.action";

const initialState: PopularCategoriesStateInterface = {
  isLoading: false,
  categories: null
}

export const getPopularCategoriesReducer = createReducer(
  initialState,
  on(getPopularCategoriesAction,
    (state: PopularCategoriesStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(getPopularCategoriesSuccessAction,
    (state: PopularCategoriesStateInterface, action) => ({
      ...state,
      isLoading: false,
      categories: action.categories
    })
  ),
  on(getPopularCategoriesFailureAction,
    (state: PopularCategoriesStateInterface) => ({
      ...state,
      isLoading: false
    })
  ),
)

export function reducers(state: PopularCategoriesStateInterface, action: Action) {
  return getPopularCategoriesReducer(state, action)
}
