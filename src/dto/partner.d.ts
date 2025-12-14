import type { Partner } from '../../config/database/generated/client.ts'

export interface ICreatePartnerDTO {
  name: string
  logoUrl?: string
  websiteUrl?: string
  description?: string
  category?: string
  since: Date
  isActive?: boolean
}

export interface IFindAllPartnerDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    description?: string
    category?: string
    isActive?: boolean
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdatePartnerDTO
  extends Partial<Omit<Partner, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountPartnerDTO {
  filter: {
    name?: string
    description?: string
    category?: string
    isActive?: boolean
  }
}
