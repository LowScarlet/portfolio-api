export interface User_ValidationErrors {
  username?: string,
  password?: string,
  role?: string,
  isActive?: string,
}

export interface User_Update {
  username?: string,
  password?: string,
  role?: string,
  isActive?: boolean,
}

export interface User {
  id: string,
  username: string,
  password: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}