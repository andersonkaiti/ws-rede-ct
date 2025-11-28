import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountRegionalCongressDTO,
  ICreateRegionalCongressDTO,
  IFindAllRegionalCongressDTO,
} from '../../dto/regional-congress/regional-congress.js'
import type { IRegionalCongressRepository } from './iregional-congress-repository.d.ts'

export class RegionalCongressRepository implements IRegionalCongressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(congress: ICreateRegionalCongressDTO) {
    await this.prisma.regionalCongress.create({
      data: congress,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, edition, location, orderBy },
  }: IFindAllRegionalCongressDTO) {
    const where: Prisma.RegionalCongressWhereInput = {}

    const or: Prisma.RegionalCongressWhereInput[] = []

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

    return await this.prisma.regionalCongress.findMany({
      where,
      include: {
        regionalCongressPartners: true,
        regionalCongressGalleryItems: true,
      },
      orderBy: orderBy ? { startDate: orderBy } : { startDate: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.regionalCongress.findFirst({
      where: {
        id,
      },
      include: {
        regionalCongressPartners: true,
        regionalCongressGalleryItems: true,
      },
    })
  }

  async count({
    filter: { title, edition, location },
  }: ICountRegionalCongressDTO) {
    const where: Prisma.RegionalCongressWhereInput = {}

    const or: Prisma.RegionalCongressWhereInput[] = []

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

    return await this.prisma.regionalCongress.count({
      where,
    })
  }
}
