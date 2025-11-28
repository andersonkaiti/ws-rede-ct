import type { RegionalCongressPartner } from '@prisma/client'

export interface ICreateRegionalCongressPartnerDTO {
  name: string
  logoUrl?: string
  congressId: string
}

export interface IFindAllRegionalCongressPartnersByCongressIdDTO {
  pagination?: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    congressId: string
  }
}

export interface IUpdateRegionalCongressPartnerDTO
  extends Partial<
    Omit<RegionalCongressPartner, 'createdAt' | 'updatedAt' | 'congress'>
  > {
  id: string
}

export interface ICountRegionalCongressPartnerDTO {
  filter: {
    name?: string
    congressId: string
  }
}
