import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { GetUserProfileResponseInterface } from "./getUserProfileResponse.interface";

export interface GetUserProfileStateInterface {
  isLoading: boolean
  userProfile: GetUserProfileResponseInterface | null
  errors: BackendErrorsInterface | null
}
