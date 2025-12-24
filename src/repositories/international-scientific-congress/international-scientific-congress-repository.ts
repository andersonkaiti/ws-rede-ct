import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountInternationalScientificCongressDTO,
  ICreateInternationalScientificCongressDTO,
  IFindAllInternationalScientificCongressDTO,
  IUpdateInternationalScientificCongressDTO,
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

  async update(congress: IUpdateInternationalScientificCongressDTO) {
    await this.prisma.internationalScientificCongress.update({
      where: {
        id: congress.id,
      },
      data: congress,
    })
  }

  async deleteById(id: string) {
    await this.prisma.internationalScientificCongress.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, edition, location, orderBy },
  }: IFindAllInternationalScientificCongressDTO) {
    const where: Prisma.InternationalScientificCongressWhereInput = {}

    const or: Prisma.InternationalScientificCongressWhereInput[] = []

    if (edition) {
      or.push({
        edition: {
          equals: edition,
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

    if (location) {
      or.push({
        location: {
          contains: location,
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
      orderBy: {
        startDate: orderBy,
      },
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
    filter: { title, edition, location },
  }: ICountInternationalScientificCongressDTO) {
    const where: Prisma.InternationalScientificCongressWhereInput = {}

    const or: Prisma.InternationalScientificCongressWhereInput[] = []

    if (edition) {
      or.push({
        edition: {
          equals: edition,
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

    if (location) {
      or.push({
        location: {
          contains: location,
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
