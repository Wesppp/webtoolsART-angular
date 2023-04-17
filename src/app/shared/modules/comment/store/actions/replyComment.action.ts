import {createAction, props} from "@ngrx/store";
import {CommentRequestInterface} from "../../../../types/commentRequest.interface";
import {ActionTypes} from "../actionTypes";
import {CommentInterface} from "../../../../types/comment.interface";

export const replyCommentAction = createAction(
  ActionTypes.REPLY_COMMENT,
  props<{ request: CommentRequestInterface }>()
)

export const replyCommentSuccessAction = createAction(
  ActionTypes.REPLY_COMMENT_SUCCESS,
  props<{ reply: CommentInterface }>()
)

export const replyCommentFailureAction = createAction(
  ActionTypes.REPLY_COMMENT_FAILURE,
)
