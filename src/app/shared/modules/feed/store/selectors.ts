import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";

export const feedFeatureSelector = createFeatureSelector<FeedStateInterface>('feed')

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
)

export const feedDataSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
)

export const backendErrorsSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.errors
)

export const articlesCountSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data?.articlesCount || null
)

export const isFeedDataEmptySelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data?.articles.length === 0 || false
)
