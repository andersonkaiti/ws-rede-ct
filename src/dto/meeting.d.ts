import type { MeetingFormat, MeetingStatus } from '@prisma/client'

export interface ICreateMeetingDTO {
  title: string
  scheduledAt: Date
  format: MeetingFormat
  agenda: string
  meetingLink?: string
  location?: string
  status?: MeetingStatus
}

export interface IFindAllMeetingDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    format?: MeetingFormat
    status?: MeetingStatus
    orderBy?: 'asc' | 'desc'
  }
}

export interface ICountMeetingDTO {
  filter: {
    title?: string
    format?: MeetingFormat
    status?: MeetingStatus
  }
}
