export interface PortfolioProfile_ValidationErrors {
  // 
}

export interface PortfolioProfile_Update {
  // 
}

export interface PortfolioProfile {
  id: string
  name: string
  logo: string
  banner: string
  fullName: string
  label: string
  nickname: string
  about: string
  country: string
  email: Array<string>
  phone: Array<string>
  website: Array<string>
  portfolioId: string
  createdAt: string
  updatedAt: string
}