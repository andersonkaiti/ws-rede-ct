import type { Pendency } from '@prisma/client'

export interface ICreatePendencyDTO {
  title: string
  description?: string
  status: 'PENDING' | 'PAID'
  dueDate?: Date
  documentUrl: string
  userId: string
}

export interface IFindPendenciesDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    orderBy?: 'asc' | 'desc'
    userId?: string
  }
}

export interface IFindByUserIdDTO {
  userId: string
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdatePendencyDTO
  extends Partial<Omit<Pendency, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountPendenciesDTO {
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    userId?: string
  }
}
