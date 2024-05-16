import { User } from "@/app/(main)/account/_interface/UserInterface";

export interface AuthContextInterface {
  "isAuthenticated": boolean,
  "user": User | null
}