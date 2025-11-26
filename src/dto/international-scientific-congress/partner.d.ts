import type { CongressPartner } from '@prisma/client'

export interface ICreateCongressPartnerDTO {
  name: string
  logoUrl?: string
  congressId: string
}

export interface IUpdateCongressPartnerDTO
  extends Partial<
    Omit<CongressPartner, 'createdAt' | 'updatedAt' | 'congress'>
  > {
  id: string
}
