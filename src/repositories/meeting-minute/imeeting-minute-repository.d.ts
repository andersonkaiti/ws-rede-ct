import type { MeetingMinute } from '@prisma/client'
import type {
  ICreateMeetingMinuteDTO,
  IUpdateMeetingMinuteDTO,
} from '../../dto/meeting-minute.d.ts'

export interface IMeetingMinuteRepository {
  create(meetingMinute: ICreateMeetingMinuteDTO): Promise<MeetingMinute>
  update(meetingMinute: IUpdateMeetingMinuteDTO): Promise<void>
  findByMeetingId(meetingId: string): Promise<MeetingMinute | null>
}
