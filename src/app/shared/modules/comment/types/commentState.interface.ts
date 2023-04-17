import {BackendErrorsInterface} from "../../../types/backendErrors.interface";
import {CommentInterface} from "../../../types/comment.interface";

export interface CommentStateInterface {
  error: BackendErrorsInterface | null
  replies: CommentInterface[] | null
  isLoading: boolean
}
