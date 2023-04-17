import { CurrentUserInterface } from "./currentUser.interface";

export interface CommentInterface {
  _id: string
  text: string
  author: CurrentUserInterface
  createdAt: string
  updatedAt: string
  parentComment: string,
  repliesCount: number
}
