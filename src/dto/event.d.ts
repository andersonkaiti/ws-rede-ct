import type { Event, EventFormat, EventStatus } from '@prisma/client'

export interface ICreateEventDTO {
  title: string
  description?: string
  imageUrl?: string
  startDate: Date
  endDate: Date
  location?: string
  status?: EventStatus
  format: EventFormat
  eventLink?: string
}

export interface IFindAllEventDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    status?: EventStatus
    format?: EventFormat
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateEventDTO
  extends Partial<Omit<Event, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountEventsDTO {
  filter: {
    title?: string
    status?: EventStatus
    format?: EventFormat
  }
}
