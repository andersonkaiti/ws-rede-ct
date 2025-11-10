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
