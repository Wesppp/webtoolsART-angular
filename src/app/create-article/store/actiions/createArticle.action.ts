import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import {
  InputArticleRequestInterface
} from "../../../shared/types/inputArticleRequest.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { ArticleInterface } from "../../../shared/types/article.interface";

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ request: InputArticleRequestInterface }>()
)

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
)

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
