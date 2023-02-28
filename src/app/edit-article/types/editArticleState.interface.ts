import { ArticleInterface } from "../../shared/types/article.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export interface EditArticleStateInterface {
  isLoading: boolean
  isSubmitting: boolean
  article: ArticleInterface | null
  errors: BackendErrorsInterface | null
}
