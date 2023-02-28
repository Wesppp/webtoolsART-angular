import { FeedStateInterface } from "../types/feedState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "./actions/getFeed.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: FeedStateInterface = {
  isLoading: false,
  errors: null,
  data: null
}

export const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state: FeedStateInterface) => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccessAction,
    (state: FeedStateInterface, action) => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state: FeedStateInterface, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors
    })
  ),
  on(routerNavigationAction, (state: FeedStateInterface) => initialState)
)

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action)
}
