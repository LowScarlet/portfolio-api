export interface User_ValidationErrors {
  username?: string,
  role?: string,
  isActive?: string,
}

export interface User_Update {
  username: string,
  role: string,
  isActive: boolean,
}

export interface User {
  id: string,
  username: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}