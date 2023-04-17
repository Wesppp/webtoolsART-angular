import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CommentsStateInterface} from "../types/commentsState.interface";

export const commentsFeatureSelector = createFeatureSelector<CommentsStateInterface>('comments')

export const isLoadingSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: CommentsStateInterface) => commentsState.isLoading
)

export const isSubmittingSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: CommentsStateInterface) => commentsState.isSubmitting
)


export const commentsSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: CommentsStateInterface) => commentsState.comments
)

export const backendErrorsSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: CommentsStateInterface) => commentsState.errors
)

export const totalCommentsCountSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: CommentsStateInterface) => commentsState.totalCommentsCount
)
