import { SocialNetworksInterface } from "./socialNetworks.interface";

export interface CurrentUserInterface {
  _id: string
  createdAt: string
  updatedAt: string
  username: string
  email: string
  role: string
  bio?: string
  specialization?: string
  profileImage?: string
  articles?: string[]
  favoritesArticles?: string[]
  residence?: string
  phone?: string
  socialNetworks: SocialNetworksInterface[]
}
