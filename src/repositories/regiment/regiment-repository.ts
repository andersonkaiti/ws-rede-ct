import type { Prisma, PrismaClient, RegimentStatus } from '@prisma/client'
import type {
  ICountRegimentDTO,
  ICreateRegimentDTO,
  IFindAllRegimentDTO,
  IUpdateRegimentDTO,
} from '../../dto/regiment.d.ts'
import type { IRegimentRepository } from './iregiment-repository.d.ts'

export class RegimentRepository implements IRegimentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(regiment: ICreateRegimentDTO) {
    return await this.prisma.regiment.create({
      data: regiment,
    })
  }

  async update(regiment: IUpdateRegimentDTO) {
    await this.prisma.regiment.update({
      where: {
        id: regiment.id,
      },
      data: regiment,
    })
  }

  async deleteById(id: string) {
    await this.prisma.regiment.delete({
      where: { id },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, status, orderBy },
  }: IFindAllRegimentDTO) {
    const where: Prisma.RegimentWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (status) {
      where.status = status
    }

    return await this.prisma.regiment.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.regiment.findFirst({
      where: {
        id,
      },
    })
  }

  async findByStatus(status: RegimentStatus) {
    return await this.prisma.regiment.findMany({
      where: {
        status,
      },
    })
  }

  async count({ filter: { title, status } }: ICountRegimentDTO) {
    const where: Prisma.RegimentWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (status) {
      where.status = status
    }

    return await this.prisma.regiment.count({
      where,
    })
  }
}
