import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CreateArticleStateInterface } from "./types/createArticleState.interface";

export const createArticleFeatureSelector = createFeatureSelector<CreateArticleStateInterface>('createArticle')

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) => createArticleState.isSubmitting
)

export const backendErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) => createArticleState.errors
)
