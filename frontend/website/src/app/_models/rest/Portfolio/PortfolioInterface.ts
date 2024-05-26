export interface Portfolio_ValidationErrors {
  // 
}

export interface Portfolio_Update {
  // 
}

export interface Portfolio {
  id: string
  name: string
  description: string | null
  isPublic: boolean
  ownerId: string
  createdAt: string
  updatedAt: string
}