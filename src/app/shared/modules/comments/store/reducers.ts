import { CommentsStateInterface } from "../types/commentsState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {getCommentsAction, getCommentsFailureAction, getCommentsSuccessAction} from "./actions/getComments.action";
import {addCommentAction, addCommentFailureAction, addCommentSuccessAction} from "./actions/addComment.action";
import {
  deleteCommentFailureAction,
  deleteCommentSuccessAction
} from "./actions/deleteComment.action";
import {updateCommentFailureAction, updateCommentSuccessAction} from "./actions/updateComment.action";
import {replyCommentSuccessAction} from "../../comment/store/actions/replyComment.action";

const initialState: CommentsStateInterface = {
  comments: null,
  isLoading: false,
  errors: null,
  isSubmitting: false,
  totalCommentsCount: 0
}

export const commentsReducer = createReducer(
  initialState,
  on(
    getCommentsAction,
    (state: CommentsStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCommentsSuccessAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      isLoading: false,
      comments: action.comments,
      totalCommentsCount: action.totalCommentsCount
    })
  ),
  on(
    getCommentsFailureAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors
    })
  ),
  on(
    addCommentAction,
    (state: CommentsStateInterface) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    addCommentSuccessAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      comments: state.comments ?
        [action.comment, ...state.comments] : [action.comment],
      totalCommentsCount: state.totalCommentsCount + 1
    })
  ),
  on(
    addCommentFailureAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(
    deleteCommentSuccessAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      comments: state.comments?.filter(comment => comment._id !== action.comment._id) || null,
      totalCommentsCount: state.totalCommentsCount - 1
    })
  ),
  on(
    deleteCommentFailureAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      errors: action.errors
    })
  ),
  on(
    updateCommentSuccessAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      comments: state.comments?.map(comment =>
        comment._id === action.comment._id ? action.comment : comment
      ) || null
    })
  ),
  on(
    updateCommentFailureAction,
    (state: CommentsStateInterface, action) => ({
      ...state,
      errors: action.errors
    })
  ),
  on(
    replyCommentSuccessAction,
    (state: CommentsStateInterface) => ({
      ...state, totalCommentsCount: state.totalCommentsCount + 1
    })
  )
)

export function reducers(state: CommentsStateInterface, action: Action) {
  return commentsReducer(state, action)
}
