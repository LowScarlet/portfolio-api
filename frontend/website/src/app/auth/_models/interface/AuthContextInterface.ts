export interface AuthContextInterface {
  "isAuthenticated": boolean,
  "user": {
    id: String,
    username: String,
    role: String,
    avatar: String | null,
  } | null,
}