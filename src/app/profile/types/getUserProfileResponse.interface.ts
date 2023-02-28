import { CurrentUserInterface } from "../../shared/types/currentUser.interface";

export interface GetUserProfileResponseInterface {
  user: CurrentUserInterface
  articlesCount: number
}
