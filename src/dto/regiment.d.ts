import type {
  Regiment,
  RegimentStatus,
} from '../../config/database/generated/client.ts'

export interface ICreateRegimentDTO {
  title: string
  version: string
  publishedAt: Date
  documentUrl: string
  status?: RegimentStatus
}

export interface IFindAllRegimentDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    status?: RegimentStatus
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateRegimentDTO
  extends Partial<Omit<Regiment, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountRegimentDTO {
  filter: {
    title?: string
    status?: RegimentStatus
  }
}
