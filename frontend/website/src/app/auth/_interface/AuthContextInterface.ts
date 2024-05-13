import { UserInterface } from "@/app/_interface/UserInterface";

export interface AuthContextInterface {
  "isAuthenticated": boolean,
  "user": UserInterface | null
}