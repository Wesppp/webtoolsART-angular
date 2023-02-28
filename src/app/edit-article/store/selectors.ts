import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EditArticleStateInterface } from "../types/editArticleState.interface";

export const editArticleFeatureSelector = createFeatureSelector<EditArticleStateInterface>('edit-article')

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
)

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
)

export const backendErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.errors
)

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
)
