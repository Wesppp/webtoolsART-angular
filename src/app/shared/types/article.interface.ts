import { CurrentUserInterface } from "./currentUser.interface";

export interface ArticleInterface {
  _id: string
  author: CurrentUserInterface
  title: string
  quickSummary: string
  description: string
  sourceLink: string
  categories: string[]
  createdAt: string
  updatedAt: string
  favoritesCount: number
  comments: string[]
}
