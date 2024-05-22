import { User } from "@/app/_models/rest/User/UserInterface";
import { UserProfile } from "@/app/_models/rest/UserProfile/UserProfileInterface";

export interface AuthContextInterface {
  "isAuthenticated": boolean,
  "user": User | null,
  "userProfile": UserProfile | null
}