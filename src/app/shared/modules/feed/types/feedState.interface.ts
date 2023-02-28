import { BackendErrorsInterface } from "../../../types/backendErrors.interface";
import { GetFeedResponseInterface } from "./getFeedResponse.interface";

export interface FeedStateInterface {
  isLoading: boolean
  errors: BackendErrorsInterface | null
  data: GetFeedResponseInterface | null
}
