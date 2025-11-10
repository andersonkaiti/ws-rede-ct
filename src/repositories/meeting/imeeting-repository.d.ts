import type { Meeting, MeetingMinute } from '@prisma/client'
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
  count(data: ICountMeetingDTO): Promise<number>
}
