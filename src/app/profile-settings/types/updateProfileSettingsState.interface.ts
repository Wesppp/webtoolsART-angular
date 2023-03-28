import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {BackendErrorsInterface} from "../../shared/types/backendErrors.interface";

export interface UpdateProfileSettingsStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  errors: BackendErrorsInterface | null
}
