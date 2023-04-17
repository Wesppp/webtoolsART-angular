import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {CommentInterface} from "../../../../types/comment.interface";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";
import {CommentRequestInterface} from "../../../../types/commentRequest.interface";

export const addCommentAction = createAction(
  ActionTypes.ADD_COMMENT,
  props<{ request: CommentRequestInterface }>()
)

export const addCommentSuccessAction = createAction(
  ActionTypes.ADD_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>()
)

export const addCommentFailureAction = createAction(
  ActionTypes.ADD_COMMENT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
