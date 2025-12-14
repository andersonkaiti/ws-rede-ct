import type { Webinar } from '../../config/database/generated/client.ts'

export interface ICreateWebinarDTO {
  title: string
  description?: string
  scheduledAt: Date
  webinarLink?: string
  thumbnailUrl?: string
  guestIds?: string[]
}

export interface IFindWebinarsDTO {
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

export interface IUpdateWebinarDTO
  extends Partial<Omit<Webinar, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountWebinarsDTO {
  filter: {
    title?: string
    description?: string
  }
}
