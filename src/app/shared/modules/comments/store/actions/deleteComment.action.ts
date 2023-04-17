import {createAction, props} from "@ngrx/store";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";
import {CommentInterface} from "../../../../types/comment.interface";
import {ActionTypes} from "../actionTypes";

export const deleteCommentAction = createAction(
  ActionTypes.DELETE_COMMENT,
  props<{ slug: string }>()
)

export const deleteCommentSuccessAction = createAction(
  ActionTypes.DELETE_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>()
)

export const deleteCommentFailureAction = createAction(
  ActionTypes.DELETE_COMMENT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
