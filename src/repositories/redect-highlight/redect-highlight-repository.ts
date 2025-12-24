import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
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

  async deleteById(id: string) {
    await this.prisma.redeCTHighlight.delete({
      where: { id },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { type, description, orderBy },
  }: IFindAllRedeCTHighlightDTO) {
    const where: Prisma.RedeCTHighlightWhereInput = {}

    const or: Prisma.RedeCTHighlightWhereInput[] = []

    if (type) {
      where.type = type
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

    return await this.prisma.redeCTHighlight.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.redeCTHighlight.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
  }

  async count({ filter: { type, description } }: ICountRedeCTHighlightDTO) {
    const where: Prisma.RedeCTHighlightWhereInput = {}

    const or: Prisma.RedeCTHighlightWhereInput[] = []

    if (type) {
      where.type = type
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

    return await this.prisma.redeCTHighlight.count({
      where,
    })
  }
}
