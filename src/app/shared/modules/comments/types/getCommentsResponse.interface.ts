import {CommentInterface} from "../../../types/comment.interface";

export interface GetCommentsResponseInterface {
  comments: CommentInterface[]
  commentsCount: number
}
