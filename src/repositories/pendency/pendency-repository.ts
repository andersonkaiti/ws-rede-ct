import type { Pendency, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountPendenciesDTO,
  ICreatePendencyDTO,
  IFindByUserIdDTO,
  IFindPendenciesDTO,
  IUpdatePendencyDTO,
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

  async findById(id: string): Promise<IPendencyWithUser | null> {
    return await this.prisma.pendency.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }

  async findByUserId({
    filter: { description, orderBy, title, status },
    pagination: { limit, offset },
    userId,
  }: IFindByUserIdDTO): Promise<Pendency[]> {
    const where: Prisma.PendencyWhereInput = {
      userId,
      AND: {
        status: {
          equals: status,
        },
      },
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
      skip: offset,
      take: limit,
    })
  }

  async update({ id, ...data }: IUpdatePendencyDTO): Promise<void> {
    await this.prisma.pendency.update({
      where: {
        id,
      },
      data,
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.pendency.delete({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { description, title, status, userId },
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

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (status) {
      or.push({
        status: {
          equals: status,
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
