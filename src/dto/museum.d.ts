import type { Museum } from '../../config/database/generated/client.ts'

export interface ICreateMuseumDTO {
  name: string
  logoUrl?: string
  city?: string
  state?: string
  country?: string
  description?: string
  website?: string
  email?: string
  phone?: string
  address?: string
  functioning?: string
}

export interface IFindAllMuseumDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    city?: string
    state?: string
    country?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateMuseumDTO
  extends Partial<Omit<Museum, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountMuseumDTO {
  filter: {
    name?: string
    city?: string
    state?: string
    country?: string
  }
}
