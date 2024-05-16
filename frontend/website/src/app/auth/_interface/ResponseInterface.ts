import { TokenInterface } from "./TokenInterface"
import { User } from "@/app/(main)/account/_interface/UserInterface"

export interface ResponseInterface {
  "message": string,
  "data": {
    "user": User,
    "accessToken": TokenInterface,
    "refreshToken": TokenInterface
  },
  "validationErrors": {
    "username": string,
    "password": string
  }
}