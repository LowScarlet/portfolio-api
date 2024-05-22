import { User } from "@/app/_models/rest/User/UserInterface"
import { TokenInterface } from "./TokenInterface"

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
  },
  "resetTime": string
}