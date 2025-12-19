import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountEventsDTO,
  ICreateEventDTO,
  IFindAllEventDTO,
  IUpdateEventDTO,
} from '../../dto/event.d.ts'
import type { IEventRepository } from './ievent-repository.d.ts'

export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(event: ICreateEventDTO) {
    return await this.prisma.event.create({
      data: event,
    })
  }

  async update(event: IUpdateEventDTO) {
    await this.prisma.event.update({
      where: {
        id: event.id,
      },
      data: event,
    })
  }

  async deleteById(id: string) {
    await this.prisma.event.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, status, format, orderBy },
  }: IFindAllEventDTO) {
    const where: Prisma.EventWhereInput = {}

    const or: Prisma.EventWhereInput[] = []

    if (status) {
      where.status = status
    }

    if (format) {
      where.format = format
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

    return await this.prisma.event.findMany({
      where,
      orderBy: orderBy ? { startDate: orderBy } : { startDate: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.event.findFirst({
      where: {
        id,
      },
    })
  }

  async count({ filter: { title, status, format } }: ICountEventsDTO) {
    const where: Prisma.EventWhereInput = {}

    const or: Prisma.EventWhereInput[] = []

    if (status) {
      where.status = status
    }

    if (format) {
      where.format = format
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

    return await this.prisma.event.count({
      where,
    })
  }
}
