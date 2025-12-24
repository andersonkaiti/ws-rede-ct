import type { ETP } from '../../config/database/generated/client.ts'

export interface ICreateETPDTO {
  code: string
  title: string
  description?: string
  notes?: string
  leaderId: string
  deputyLeaderId: string
  secretaryId: string
  memberIds: string[]
}

export interface IFindAllETPsDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    code?: string
    title?: string
    description?: string
    notes?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateETPDTO
  extends Partial<Omit<ETP, 'createdAt' | 'updatedAt'>> {
  id: string
  leaderId?: string
  deputyLeaderId?: string
  secretaryId?: string
  memberIds?: string[]
}

export interface ICountETPsDTO {
  filter: {
    code?: string
    title?: string
    description?: string
    notes?: string
  }
}
