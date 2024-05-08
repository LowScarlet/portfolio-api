import { TokenInterface } from "./TokenInterface"
import { UserInterface } from "./UserInterface"

export interface ResponseInterface {
  "message": string,
  "data": {
    "user": UserInterface,
    "accessToken": TokenInterface,
    "refreshToken": TokenInterface
  },
  "validationErrors": {
    "username": string,
    "password": string
  }
}