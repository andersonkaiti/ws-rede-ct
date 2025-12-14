import type { MeetingMinute } from '../../config/database/generated/client.ts'

export interface ICreateMeetingMinuteDTO {
  title: string
  publishedAt: Date
  documentUrl: string
  meetingId: string
}

export interface IUpdateMeetingMinuteDTO
  extends Partial<Omit<MeetingMinute, 'createdAt' | 'updatedAt' | 'meeting'>> {
  id: string
}
