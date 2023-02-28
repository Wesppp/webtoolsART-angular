import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

export const deleteArticleAction = createAction(
  ActionTypes.DELETE_ARTICLE,
  props<{ articleId: string }>()
)

export const deleteArticleSuccessAction = createAction(
  ActionTypes.DELETE_ARTICLE_SUCCESS
)

export const deleteArticleFailureAction = createAction(
  ActionTypes.DELETE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
