import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountRegionalCongressDTO,
  ICreateRegionalCongressDTO,
  IFindAllRegionalCongressDTO,
  IUpdateRegionalCongressDTO,
} from '../../dto/regional-congress/regional-congress.js'
import type { IRegionalCongressRepository } from './iregional-congress-repository.d.ts'

export class RegionalCongressRepository implements IRegionalCongressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(congress: ICreateRegionalCongressDTO) {
    await this.prisma.regionalCongress.create({
      data: congress,
    })
  }

  async update(congress: IUpdateRegionalCongressDTO) {
    await this.prisma.regionalCongress.update({
      where: {
        id: congress.id,
      },
      data: congress,
    })
  }

  async deleteById(id: string) {
    await this.prisma.regionalCongress.delete({
      where: {
        id,
      },
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
      orderBy: {
        startDate: orderBy,
      },
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

  async findByEdition(edition: number) {
    return await this.prisma.regionalCongress.findMany({
      where: {
        edition,
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
