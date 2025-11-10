import type { Meeting } from '@prisma/client'
import type { ICreateMeetingDTO } from '../../dto/meeting.d.ts'

export interface IMeetingRepository {
  create(meeting: ICreateMeetingDTO): Promise<Meeting>
}
