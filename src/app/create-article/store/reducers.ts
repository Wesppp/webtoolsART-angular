import { CreateArticleStateInterface } from "./types/createArticleState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "./actiions/createArticle.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  errors: null
}

const createArticleReducer = createReducer(
  initialState,
  on(createArticleAction,
    (state: CreateArticleStateInterface) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(createArticleSuccessAction,
    (state: CreateArticleStateInterface) => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(createArticleFailureAction,
    (state: CreateArticleStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors
    })
  ),
  on(routerNavigationAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      errors: null
    })
  )
)

export function reducers(state: CreateArticleStateInterface, action: Action) {
  return createArticleReducer(state, action)
}
