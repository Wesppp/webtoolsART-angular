import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CommentStateInterface} from "../types/commentState.interface";

export const commentFeatureSelector = createFeatureSelector<CommentStateInterface>('comment')

export const isLoadingSelector = createSelector(
  commentFeatureSelector,
  (commentState: CommentStateInterface) => commentState.isLoading
)

export const repliesSelector = createSelector(
  commentFeatureSelector,
  (commentState: CommentStateInterface) => commentState.replies
)
