import type { RedeCTHighlight, RedeCTHighlightType } from '@prisma/client'

export interface ICreateRedeCTHighlightDTO {
  type: RedeCTHighlightType
  name: string
  description?: string
  honorableMention?: string
  imageUrl?: string
  honoredAt: Date
  meritUrl?: string
}

export interface IUpdateRedeCTHighlightDTO
  extends Partial<Omit<RedeCTHighlight, 'createdAt' | 'updatedAt'>> {
  id: string
}
