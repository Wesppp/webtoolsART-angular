import {CommentStateInterface} from "../types/commentState.interface";
import {Action, createReducer, on} from "@ngrx/store";

import {replyCommentFailureAction, replyCommentSuccessAction} from "./actions/replyComment.action";
import {
  getCommentRepliesAction,
  getCommentRepliesFailureAction,
  getCommentRepliesSuccessAction
} from "./actions/getCommentReplies.action";
import {
  deleteCommentFailureAction as deleteReplyFailureAction,
  deleteCommentSuccessAction as deleteReplySuccessAction
} from "../../comments/store/actions/deleteComment.action";
import {
  updateCommentFailureAction as updateReplyFailureAction,
  updateCommentSuccessAction as updateReplySuccessAction
} from "../../comments/store/actions/updateComment.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: CommentStateInterface = {
  isLoading: false,
  replies: null,
  error: null
}

export const commentReducer = createReducer(
  initialState,
  on(
    replyCommentSuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      replies: state.replies ?
        [action.reply, ...state.replies] : [action.reply]
    })
  ),
  on(
    replyCommentFailureAction,
    (state: CommentStateInterface) => ({
      ...state
    })
  ),
  on(
    getCommentRepliesAction,
    (state: CommentStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCommentRepliesSuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      isLoading: false,
      replies: state.replies ?
        [...state.replies, ...action.replies.filter(reply => state.replies && !state.replies.find(r => r._id === reply._id))]
        : [...action.replies]
    })
  ),
  on(
    getCommentRepliesFailureAction,
    (state: CommentStateInterface) => ({
      ...state,
      isLoading: false
    })
  ),
  on(
    deleteReplySuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      replies: state.replies?.filter(reply => reply._id !== action.comment._id) || null,
    })
  ),
  on(
    deleteReplyFailureAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      errors: action.errors
    })
  ),
  on(
    updateReplySuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      replies: state.replies?.map(reply =>
        reply._id === action.comment._id ? action.comment : reply
      ) || null
    })
  ),
  on(
    updateReplyFailureAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      errors: action.errors
    })
  ),
  on(
    routerNavigationAction, (state: CommentStateInterface) => initialState
  )
)

export function reducers(state: CommentStateInterface, action: Action) {
  return commentReducer(state, action)
}
