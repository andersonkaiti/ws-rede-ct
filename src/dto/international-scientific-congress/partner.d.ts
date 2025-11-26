import type { CongressPartner } from '@prisma/client'

export interface ICreateCongressPartnerDTO {
  name: string
  logoUrl?: string
  congressId: string
}

export interface IFindAllPartnersByCongressIdDTO {
  pagination?: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    congressId: string
  }
}

export interface IUpdateCongressPartnerDTO
  extends Partial<
    Omit<CongressPartner, 'createdAt' | 'updatedAt' | 'congress'>
  > {
  id: string
}

export interface ICountCongressPartnerDTO {
  filter: {
    name?: string
    congressId: string
  }
}
