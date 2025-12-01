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

export interface IUpdateEventDTO
  extends Partial<Omit<Event, 'createdAt' | 'updatedAt'>> {
  id: string
}
