import { BackendErrorsInterface } from "../../../types/backendErrors.interface";
import {CommentInterface} from "../../../types/comment.interface";

export interface CommentsStateInterface {
  comments: CommentInterface[] | null
  isLoading: boolean
  errors: BackendErrorsInterface | null
  isSubmitting: boolean
  totalCommentsCount: number
}
