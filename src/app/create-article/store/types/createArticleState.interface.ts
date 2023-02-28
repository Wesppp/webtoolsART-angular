import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

export interface CreateArticleStateInterface {
  isSubmitting: boolean,
  errors: BackendErrorsInterface | null
}
