import { User } from "@/app/_models/rest/User/UserInterface";

export interface AuthContextInterface {
  "isAuthenticated": boolean,
  "user": User | null
}