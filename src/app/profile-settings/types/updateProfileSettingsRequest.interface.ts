import {SocialNetworksInterface} from "../../shared/types/socialNetworks.interface";

export interface UpdateProfileSettingsRequestInterface {
  username: string
  email: string
  bio?: string
  specialization?: string
  profileImage?: string
  residence?: string
  phone?: string
  socialNetworks?: SocialNetworksInterface[]
}
