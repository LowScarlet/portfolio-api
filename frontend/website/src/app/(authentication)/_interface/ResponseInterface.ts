import { User } from "@/app/_models/rest/User/UserInterface"
import { TokenInterface } from "./TokenInterface"
import { UserProfile } from "@/app/_models/rest/UserProfile/UserProfileInterface"

export interface ResponseInterface {
  "message": string,
  "data": {
    "user": User & {
      "UserProfile": UserProfile
    },
    "accessToken": TokenInterface,
    "refreshToken": TokenInterface
  },
  "validationErrors": {
    "username": string,
    "password": string
  },
  "resetTime": string
}