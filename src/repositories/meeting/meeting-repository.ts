import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountMeetingDTO,
  ICreateMeetingDTO,
  IFindAllMeetingDTO,
} from '../../dto/meeting.d.ts'
import type { IMeetingRepository } from './imeeting-repository.d.ts'

export class MeetingRepository implements IMeetingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(meeting: ICreateMeetingDTO) {
    return await this.prisma.meeting.create({
      data: meeting,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, format, status, orderBy },
  }: IFindAllMeetingDTO) {
    const where: Prisma.MeetingWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (format) {
      where.format = format
    }

    if (status) {
      where.status = status
    }

    return await this.prisma.meeting.findMany({
      where,
      include: {
        minutes: true,
      },
      orderBy: orderBy ? { scheduledAt: orderBy } : { scheduledAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.meeting.findFirst({
      where: {
        id,
      },
      include: {
        minutes: true,
      },
    })
  }

  async count({ filter: { title, format, status } }: ICountMeetingDTO) {
    const where: Prisma.MeetingWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (format) {
      where.format = format
    }

    if (status) {
      where.status = status
    }

    return await this.prisma.meeting.count({
      where,
    })
  }
}
