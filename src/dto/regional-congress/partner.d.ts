import type { RegionalCongressPartner } from '@prisma/client'

export interface ICreateRegionalCongressPartnerDTO {
  name: string
  logoUrl?: string
  congressId: string
}

export interface IUpdateRegionalCongressPartnerDTO
  extends Partial<
    Omit<RegionalCongressPartner, 'createdAt' | 'updatedAt' | 'congress'>
  > {
  id: string
}
