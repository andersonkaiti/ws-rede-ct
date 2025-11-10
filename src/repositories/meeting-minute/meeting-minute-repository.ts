import type { PrismaClient } from '@prisma/client'
import type {
  ICreateMeetingMinuteDTO,
  IUpdateMeetingMinuteDTO,
} from '../../dto/meeting-minute.d.ts'
import type { IMeetingMinuteRepository } from './imeeting-minute-repository.d.ts'

export class MeetingMinuteRepository implements IMeetingMinuteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(meetingMinute: ICreateMeetingMinuteDTO) {
    return await this.prisma.meetingMinute.create({
      data: meetingMinute,
      include: {
        meeting: true,
      },
    })
  }

  async update(meetingMinute: IUpdateMeetingMinuteDTO) {
    await this.prisma.meetingMinute.update({
      where: {
        id: meetingMinute.id,
      },
      data: meetingMinute,
    })
  }

  async deleteByMeetingId(id: string) {
    await this.prisma.meetingMinute.delete({
      where: {
        id,
      },
    })
  }

  async findByMeetingId(meetingId: string) {
    return await this.prisma.meetingMinute.findFirst({
      where: {
        meetingId,
      },
      include: {
        meeting: true,
      },
    })
  }
}
