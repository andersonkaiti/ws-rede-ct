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

export interface IFindAllRedeCTHighlightDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    type?: RedeCTHighlightType
    description?: string
    honorableMention?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateRedeCTHighlightDTO
  extends Partial<Omit<RedeCTHighlight, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountRedeCTHighlightDTO {
  filter: {
    name?: string
    type?: RedeCTHighlightType
    description?: string
    honorableMention?: string
  }
}
