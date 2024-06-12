export interface UserProfileInterface_ValidationErrors {
  avatar?: string
  fullName?: string
  bio?: string
}

export interface UserProfileInterface_Update {
  avatar?: string | null
  fullName?: string | null
  bio?: string | null
  userId?: string
}

export interface UserProfileInterface {
  id: string
  avatar: string | null
  fullName: string | null
  bio: string | null
  userId: string
  createdAt: string
  updatedAt: string
}