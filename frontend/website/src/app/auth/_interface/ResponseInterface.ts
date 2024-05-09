import { UserInterface } from "@/app/_interface/UserInterface"
import { TokenInterface } from "./TokenInterface"

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