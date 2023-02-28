import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { InputArticleRequestInterface } from "../../../shared/types/inputArticleRequest.interface";

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ slug: string, article: InputArticleRequestInterface }>()
)

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
)

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
