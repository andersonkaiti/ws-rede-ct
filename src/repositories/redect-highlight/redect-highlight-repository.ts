import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountRedeCTHighlightDTO,
  ICreateRedeCTHighlightDTO,
  IFindAllRedeCTHighlightDTO,
  IUpdateRedeCTHighlightDTO,
} from '../../dto/redect-highlight.d.ts'
import type { IRedeCTHighlightRepository } from './iredect-highlight-repository.d.ts'

export class RedeCTHighlightRepository implements IRedeCTHighlightRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(highlight: ICreateRedeCTHighlightDTO) {
    return await this.prisma.redeCTHighlight.create({
      data: highlight,
    })
  }

  async update(highlight: IUpdateRedeCTHighlightDTO) {
    await this.prisma.redeCTHighlight.update({
      where: {
        id: highlight.id,
      },
      data: highlight,
    })
  }

  async find({
    pagination,
    filter: { name, type, description, honorableMention, orderBy },
  }: IFindAllRedeCTHighlightDTO) {
    const where: Prisma.RedeCTHighlightWhereInput = {}

    const or: Prisma.RedeCTHighlightWhereInput[] = []

    if (type) {
      where.type = type
    }

    if (name) {
      or.push({
        name: {
          contains: name,
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

    if (honorableMention) {
      or.push({
        honorableMention: {
          contains: honorableMention,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.redeCTHighlight.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
    })
  }

  async count({
    filter: { name, type, description, honorableMention },
  }: ICountRedeCTHighlightDTO) {
    const where: Prisma.RedeCTHighlightWhereInput = {}

    const or: Prisma.RedeCTHighlightWhereInput[] = []

    if (type) {
      where.type = type
    }

    if (name) {
      or.push({
        name: {
          contains: name,
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

    if (honorableMention) {
      or.push({
        honorableMention: {
          contains: honorableMention,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.redeCTHighlight.count({
      where,
    })
  }
}
