export interface UserInterface_ValidationErrors {
  username?: string,
  password?: string,
  role?: string,
  isActive?: string,
}

export interface UserInterface_Update {
  username?: string,
  password?: string,
  role?: string,
  isActive?: boolean,
}

export interface UserInterface {
  id: string,
  username: string,
  password: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}