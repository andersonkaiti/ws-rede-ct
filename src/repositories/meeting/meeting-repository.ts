import type { PrismaClient } from '@prisma/client'
import type { ICreateMeetingDTO } from '../../dto/meeting.d.ts'
import type { IMeetingRepository } from './imeeting-repository.d.ts'

export class MeetingRepository implements IMeetingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(meeting: ICreateMeetingDTO) {
    return await this.prisma.meeting.create({
      data: meeting,
    })
  }
}
