import type { Meeting, MeetingMinute, MeetingStatus } from '@prisma/client'
import type {
  ICountMeetingDTO,
  ICreateMeetingDTO,
  IFindAllMeetingDTO,
} from '../../dto/meeting.d.ts'

export interface MeetingWithMinutes extends Meeting {
  minutes: MeetingMinute | null
}

export interface IMeetingRepository {
  create(meeting: ICreateMeetingDTO): Promise<Meeting>
  find(data: IFindAllMeetingDTO): Promise<MeetingWithMinutes[] | null>
  findById(id: string): Promise<MeetingWithMinutes | null>
  findByStatus(status: MeetingStatus): Promise<MeetingWithMinutes[] | null>
  count(data: ICountMeetingDTO): Promise<number>
}
