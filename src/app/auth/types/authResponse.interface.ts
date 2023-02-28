import { CurrentUserInterface } from "../../shared/types/currentUser.interface";

export interface AuthResponseInterface {
  token: string
  user: CurrentUserInterface
}
