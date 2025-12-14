import type { Certification } from '../../config/database/generated/client.ts'

export interface IRegisterCertificationDTO {
  userId: string
  title: string
  description: string
  certificationUrl: string
}

export interface IFindCertificationsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    userId?: string
    orderBy?: 'asc' | 'desc'
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
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateCertificationDTO
  extends Partial<Omit<Certification, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountCertificationsDTO {
  filter: {
    title?: string
    description?: string
    userId?: string
  }
}
