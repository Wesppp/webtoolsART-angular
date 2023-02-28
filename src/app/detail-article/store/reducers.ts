import { ArticleStateInterface } from "../types/articleState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "./actions/getArticle.action";
import { routerNavigationAction } from "@ngrx/router-store";
import {
  deleteArticleFailureAction,
} from "./actions/deleteArticle.action";

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state: ArticleStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state: ArticleStateInterface, action) => ({
      ...state,
      isLoading: false,
      data: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state: ArticleStateInterface, action) => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
  on(
    deleteArticleFailureAction,
    (state: ArticleStateInterface, action) => ({
      ...state,
      error: action.errors
    })
  ),
  on(routerNavigationAction, (state): ArticleStateInterface => initialState)
)

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
