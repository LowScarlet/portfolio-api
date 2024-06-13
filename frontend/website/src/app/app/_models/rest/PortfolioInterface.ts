export interface PortfolioInterface_ValidationErrors {
  id?: string,
  name?: string,
  description?: string,
  isPublic?: boolean,
  ownerId?: string,
}

export interface PortfolioInterface_Update {
  name?: string,
  description?: string,
  isPublic?: boolean,
  ownerId?: string,
}

export interface PortfolioInterface {
  id: string,
  name: string,
  description: string,
  isPublic: boolean,
  ownerId: string,
  createdAt: string,
  updatedAt: string
}