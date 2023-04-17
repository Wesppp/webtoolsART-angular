import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {CommentInterface} from "../../../../types/comment.interface";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";
import {CommentRequestInterface} from "../../../../types/commentRequest.interface";

export const updateCommentAction = createAction(
  ActionTypes.UPDATE_COMMENT,
  props<{ request: CommentRequestInterface }>()
)

export const updateCommentSuccessAction = createAction(
  ActionTypes.UPDATE_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>()
)

export const updateCommentFailureAction = createAction(
  ActionTypes.UPDATE_COMMENT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
