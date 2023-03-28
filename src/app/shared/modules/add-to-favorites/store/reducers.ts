import {AddToFavoritesStateInterface} from "../types/addToFavoritesState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "./actions/addToFavorites.action";

const initialState: AddToFavoritesStateInterface = {
  isSubmitting: false
}

export const addToFavoritesReducer = createReducer(
  initialState,
  on(addToFavoritesAction,
    (state: AddToFavoritesStateInterface) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(addToFavoritesSuccessAction,
    (state: AddToFavoritesStateInterface) => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(addToFavoritesFailureAction,
    (state: AddToFavoritesStateInterface) => ({
      ...state,
      isSubmitting: false
    })
  ),
)

export function reducers(state: AddToFavoritesStateInterface, action: Action) {
  return addToFavoritesReducer(state, action)
}
