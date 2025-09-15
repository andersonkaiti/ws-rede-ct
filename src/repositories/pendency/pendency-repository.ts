import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountPendenciesDTO,
  ICreatePendencyDTO,
  IFindPendenciesDTO,
} from '../../dto/pendency.ts'
import type {
  IPendencyRepository,
  IPendencyWithUser,
} from './ipendency-repository.ts'

export class PendencyRepository implements IPendencyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: ICreatePendencyDTO): Promise<void> {
    await this.prisma.pendency.create({
      data,
    })
  }

  async find({
    filter: { description, orderBy, title, status, userId },
    pagination: { limit, offset },
  }: IFindPendenciesDTO): Promise<IPendencyWithUser[]> {
    const where: Prisma.PendencyWhereInput = {
      userId,
      AND: {
        status: {
          equals: status,
        },
      },
    }

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      }
    }

    const or: Prisma.PendencyWhereInput[] = []

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

    return await this.prisma.pendency.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      skip: offset,
      take: limit,
    })
  }

  async count({
    filter: { description, title, userId },
  }: ICountPendenciesDTO): Promise<number> {
    const where: Prisma.PendencyWhereInput = {
      userId,
    }

    const or: Prisma.PendencyWhereInput[] = []

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
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

    return await this.prisma.pendency.count({
      where,
    })
  }
}
