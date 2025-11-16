import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountInternationalScientificCongressDTO,
  ICreateInternationalScientificCongressDTO,
  IFindAllInternationalScientificCongressDTO,
} from '../../dto/international-scientific-congress/international-scientific-congress.js'
import type { IInternationalScientificCongressRepository } from './iinternational-scientific-congress-repository.d.ts'

export class InternationalScientificCongressRepository
  implements IInternationalScientificCongressRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(congress: ICreateInternationalScientificCongressDTO) {
    await this.prisma.internationalScientificCongress.create({
      data: congress,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, edition, orderBy },
  }: IFindAllInternationalScientificCongressDTO) {
    const where: Prisma.InternationalScientificCongressWhereInput = {}

    const or: Prisma.InternationalScientificCongressWhereInput[] = []

    if (edition) {
      where.edition = edition
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

    return await this.prisma.internationalScientificCongress.findMany({
      where,
      include: {
        partners: true,
        galleries: true,
      },
      orderBy: orderBy ? { startDate: orderBy } : { startDate: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.internationalScientificCongress.findFirst({
      where: {
        id,
      },
      include: {
        partners: true,
        galleries: true,
      },
    })
  }

  async findByEdition(edition: number) {
    return await this.prisma.internationalScientificCongress.findMany({
      where: {
        edition,
      },
      include: {
        partners: true,
        galleries: true,
      },
    })
  }

  async count({
    filter: { title, edition },
  }: ICountInternationalScientificCongressDTO) {
    const where: Prisma.InternationalScientificCongressWhereInput = {}

    const or: Prisma.InternationalScientificCongressWhereInput[] = []

    if (edition) {
      where.edition = edition
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

    return await this.prisma.internationalScientificCongress.count({
      where,
    })
  }
}
