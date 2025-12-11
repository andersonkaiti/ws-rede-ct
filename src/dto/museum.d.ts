import type { Museum } from '@prisma/client'

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

export interface IUpdateMuseumDTO
  extends Partial<Omit<Museum, 'createdAt' | 'updatedAt'>> {
  id: string
}
