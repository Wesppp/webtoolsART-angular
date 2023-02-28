import { ArticleInterface } from "./article.interface";
import {SocialNetworksInterface} from "./socialNetworks.interface";

export interface CurrentUserInterface {
  _id: string
  createdAt: string
  updatedAt: string
  username: string
  email: string
  bio?: string
  profileImage?: string
  articles?: string[] | ArticleInterface[]
  residence?: string
  phone?: string
  socialNetworks: SocialNetworksInterface[]
}
