import type { Prisma, PrismaClient, Webinar } from '@prisma/client'
import type {
  ICountWebinarsDTO,
  ICreateWebinarDTO,
  IFindWebinarsDTO,
  IUpdateWebinarDTO,
} from '../../dto/webinar.ts'
import type {
  IWebinarRepository,
  WebinarWithGuests,
} from './iwebinar-repository.ts'

export class WebinarRepository implements IWebinarRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    description,
    scheduledAt,
    webinarLink,
    thumbnailUrl,
    guestIds,
  }: ICreateWebinarDTO): Promise<Webinar> {
    return await this.prisma.webinar.create({
      data: {
        title,
        description,
        scheduledAt,
        webinarLink,
        thumbnailUrl,
        guests: guestIds
          ? {
              connect: guestIds.map((id) => ({ id })),
            }
          : undefined,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { description, orderBy, title },
  }: IFindWebinarsDTO): Promise<WebinarWithGuests[]> {
    const where: Prisma.WebinarWhereInput = {}

    const or: Prisma.WebinarWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.webinar.findMany({
      where,
      include: {
        guests: {
          omit: {
            passwordHash: true,
          },
        },
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<WebinarWithGuests | null> {
    return await this.prisma.webinar.findFirst({
      where: {
        id,
      },
      include: {
        guests: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }

  async update({
    id,
    title,
    description,
    scheduledAt,
    webinarLink,
    thumbnailUrl,
    guestIds,
  }: IUpdateWebinarDTO): Promise<void> {
    await this.prisma.webinar.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        scheduledAt,
        webinarLink,
        thumbnailUrl,
        guests: guestIds
          ? {
              connect: guestIds.map((guestId: string) => ({
                id: guestId,
              })),
            }
          : undefined,
      },
    })
  }

  async count({
    filter: { description, title },
  }: ICountWebinarsDTO): Promise<number> {
    const where: Prisma.WebinarWhereInput = {}

    const or: Prisma.WebinarWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.webinar.count({
      where,
    })
  }
}
