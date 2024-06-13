export interface PortfolioProfileInterface_ValidationErrors {
  id?: string,
  logo?: string,
}

export interface PortfolioProfileInterface_Update {
  logo?: string,
}

export interface PortfolioProfileInterface {
  id: string,
  logo: string,
  banner: string,
  fullName: string,
  label: string,
  nickname: string,
  about: string,
  country: string,
  email: string,
  phone: string,
  website: string,
  portfolioId: string,
  ownerId: string,
  createdAt: string,
  updatedAt: string
}