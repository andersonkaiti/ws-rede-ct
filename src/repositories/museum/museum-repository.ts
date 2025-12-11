import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountMuseumDTO,
  ICreateMuseumDTO,
  IFindAllMuseumDTO,
  IUpdateMuseumDTO,
} from '../../dto/museum.d.ts'
import type { IMuseumRepository } from './imuseum-repository.d.ts'

export class MuseumRepository implements IMuseumRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(museum: ICreateMuseumDTO) {
    return await this.prisma.museum.create({
      data: museum,
    })
  }

  async update(museum: IUpdateMuseumDTO) {
    await this.prisma.museum.update({
      where: {
        id: museum.id,
      },
      data: museum,
    })
  }

  async find({
    pagination,
    filter: { name, city, state, country, orderBy },
  }: IFindAllMuseumDTO) {
    const where: Prisma.MuseumWhereInput = {}

    const or: Prisma.MuseumWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (city) {
      or.push({
        city: {
          contains: city,
          mode: 'insensitive',
        },
      })
    }

    if (state) {
      or.push({
        state: {
          contains: state,
          mode: 'insensitive',
        },
      })
    }

    if (country) {
      or.push({
        country: {
          contains: country,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.museum.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
    })
  }

  async count({ filter: { name, city, state, country } }: ICountMuseumDTO) {
    const where: Prisma.MuseumWhereInput = {}

    const or: Prisma.MuseumWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (city) {
      or.push({
        city: {
          contains: city,
          mode: 'insensitive',
        },
      })
    }

    if (state) {
      or.push({
        state: {
          contains: state,
          mode: 'insensitive',
        },
      })
    }

    if (country) {
      or.push({
        country: {
          contains: country,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.museum.count({
      where,
    })
  }
}
