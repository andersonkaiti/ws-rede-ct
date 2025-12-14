import type {
  Meeting,
  MeetingFormat,
  MeetingStatus,
} from '../../config/database/generated/client.ts'

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

export interface IUpdateMeetingDTO
  extends Partial<Omit<Meeting, 'createdAt' | 'updatedAt' | 'minutes'>> {
  id: string
}

export interface ICountMeetingDTO {
  filter: {
    title?: string
    format?: MeetingFormat
    status?: MeetingStatus
  }
}
