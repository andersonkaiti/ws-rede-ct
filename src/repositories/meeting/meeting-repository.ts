import type { MeetingStatus, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountMeetingDTO,
  ICreateMeetingDTO,
  IFindAllMeetingDTO,
  IUpdateMeetingDTO,
} from '../../dto/meeting.d.ts'
import type { IMeetingRepository } from './imeeting-repository.d.ts'

export class MeetingRepository implements IMeetingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(meeting: ICreateMeetingDTO) {
    return await this.prisma.meeting.create({
      data: meeting,
    })
  }

  async update(meeting: IUpdateMeetingDTO) {
    await this.prisma.meeting.update({
      where: {
        id: meeting.id,
      },
      data: meeting,
    })
  }

  async deleteById(id: string) {
    await this.prisma.meeting.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, format, status, orderBy },
  }: IFindAllMeetingDTO) {
    const where: Prisma.MeetingWhereInput = {}

    const or: Prisma.MeetingWhereInput[] = []

    if (format) {
      where.format = format
    }

    if (status) {
      where.status = status
    }

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
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

  async findByStatus(status: MeetingStatus) {
    return await this.prisma.meeting.findMany({
      where: {
        status,
      },
      include: {
        minutes: true,
      },
    })
  }

  async count({ filter: { title, format, status } }: ICountMeetingDTO) {
    const where: Prisma.MeetingWhereInput = {}

    const or: Prisma.MeetingWhereInput[] = []

    if (format) {
      where.format = format
    }

    if (status) {
      where.status = status
    }

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.meeting.count({
      where,
    })
  }
}
