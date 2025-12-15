import type { MeetingMinute } from '../../../config/database/generated/client.ts'
import type {
  ICreateMeetingMinuteDTO,
  IUpdateMeetingMinuteDTO,
} from '../../dto/meeting-minute.d.ts'

export interface IMeetingMinuteWithMeeting extends MeetingMinute {
  meeting: Meeting
}

export interface IMeetingMinuteRepository {
  create(
    meetingMinute: ICreateMeetingMinuteDTO,
  ): Promise<IMeetingMinuteWithMeeting>
  update(meetingMinute: IUpdateMeetingMinuteDTO): Promise<void>
  deleteByMeetingId(id: string): Promise<void>
  findByMeetingId(meetingId: string): Promise<IMeetingMinuteWithMeeting | null>
}
