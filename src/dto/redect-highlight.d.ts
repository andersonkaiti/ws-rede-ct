import type {
  RedeCTHighlight,
  RedeCTHighlightType,
} from '../../config/database/generated/client.ts'

export interface ICreateRedeCTHighlightDTO {
  type: RedeCTHighlightType
  description?: string
  honorableMention?: boolean
  honoredAt: Date
  meritUrl?: string
  userId: string
}

export interface IFindAllRedeCTHighlightDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    type?: RedeCTHighlightType
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateRedeCTHighlightDTO
  extends Partial<Omit<RedeCTHighlight, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountRedeCTHighlightDTO {
  filter: {
    type?: RedeCTHighlightType
    description?: string
  }
}
