import {CommentStateInterface} from "../types/commentState.interface";
import {Action, createReducer, on} from "@ngrx/store";

import {replyCommentFailureAction, replyCommentSuccessAction} from "./actions/replyComment.action";
import {
  getCommentRepliesAction,
  getCommentRepliesFailureAction,
  getCommentRepliesSuccessAction
} from "./actions/getCommentReplies.action";
import {
  deleteCommentFailureAction,
  deleteCommentSuccessAction
} from "../../comments/store/actions/deleteComment.action";
import {
  updateCommentFailureAction,
  updateCommentSuccessAction
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
        [...state.replies, ...action.replies] : [...action.replies]
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
    deleteCommentSuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      replies: state.replies?.filter(reply => reply._id !== action.comment._id) || null,
    })
  ),
  on(
    deleteCommentFailureAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      errors: action.errors
    })
  ),
  on(
    updateCommentSuccessAction,
    (state: CommentStateInterface, action) => ({
      ...state,
      replies: state.replies?.map(reply =>
        reply._id === action.comment._id ? action.comment : reply
      ) || null
    })
  ),
  on(
    updateCommentFailureAction,
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
