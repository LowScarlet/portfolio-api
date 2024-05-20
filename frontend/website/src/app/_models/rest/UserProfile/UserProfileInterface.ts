export interface UserProfile_ValidationErrors {
  avatar?: string
  fullName?: string
  bio?: string
}

export interface UserProfile_Update {
  avatar?: string | null
  fullName?: string | null
  bio?: string | null
  userId?: string
}

export interface UserProfile {
  id: string
  avatar: string | null
  fullName: string | null
  bio: string | null
  userId: string
  createdAt: string
  updatedAt: string
}