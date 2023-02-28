import { EditArticleStateInterface } from "../types/editArticleState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "./actions/getArticle.action";
import { routerNavigationAction } from "@ngrx/router-store";
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from "./actions/updateArticle.action";

const initialState: EditArticleStateInterface = {
  isLoading: false,
  isSubmitting: false,
  article: null,
  errors: null
}

export const editArticleReducer = createReducer(
  initialState,
  on(getArticleAction,
    (state: EditArticleStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(getArticleSuccessAction,
    (state: EditArticleStateInterface, action) => ({
      ...state,
      isLoading: false,
      article: action.article
    })
  ),
  on(getArticleFailureAction,
    (state: EditArticleStateInterface, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors
    })
  ),
  on(updateArticleAction,
    (state: EditArticleStateInterface) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(updateArticleSuccessAction,
    (state: EditArticleStateInterface) => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(updateArticleFailureAction,
    (state: EditArticleStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(routerNavigationAction, (state: EditArticleStateInterface) => initialState)
)

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action)
}
