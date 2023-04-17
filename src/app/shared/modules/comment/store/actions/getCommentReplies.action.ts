import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {CommentInterface} from "../../../../types/comment.interface";

export const getCommentRepliesAction = createAction(
  ActionTypes.GET_COMMENT_REPLIES,
  props<{ slug: string }>()
)

export const getCommentRepliesSuccessAction = createAction(
  ActionTypes.GET_COMMENT_REPLIES_SUCCESS,
  props<{ replies: CommentInterface[] }>()
)

export const getCommentRepliesFailureAction = createAction(
  ActionTypes.GET_COMMENT_REPLIES_FAILURE,
)
