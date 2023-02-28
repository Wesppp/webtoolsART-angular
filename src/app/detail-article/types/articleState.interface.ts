import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { ArticleInterface } from "../../shared/types/article.interface";

export interface ArticleStateInterface {
  isLoading: boolean
  error: BackendErrorsInterface | null
  data: ArticleInterface | null
}
