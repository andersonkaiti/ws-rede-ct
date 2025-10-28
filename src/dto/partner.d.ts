export interface ICreatePartnerDTO {
  name: string
  logoUrl?: string
  websiteUrl?: string
  description?: string
  category?: string
  since: Date
  isActive?: boolean
}

export interface IUpdatePartnerDTO {
  id: string
  name?: string
  logoUrl?: string
  websiteUrl?: string
  description?: string
  category?: string
  since?: Date
  isActive?: boolean
}
