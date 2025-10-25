import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountInMemoriamDTO,
  ICreateInMemoriamDTO,
  IFindAllInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'
import type { IInMemoriamRepository } from './iin-memoriam-repository.d.ts'

export class InMemoriamRepository implements IInMemoriamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(inMemoriam: ICreateInMemoriamDTO) {
    return await this.prisma.inMemoriam.create({
      data: inMemoriam,
    })
  }

  async update(inMemoriam: IUpdateInMemoriamDTO) {
    return await this.prisma.inMemoriam.update({
      where: {
        id: inMemoriam.id,
      },
      data: inMemoriam,
    })
  }

  async deleteById(id: string) {
    await this.prisma.inMemoriam.delete({
      where: { id },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { name, biography, role, orderBy },
  }: IFindAllInMemoriamDTO) {
    const where: Prisma.InMemoriamWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (biography) {
      where.biography = {
        contains: biography,
        mode: 'insensitive',
      }
    }

    if (role) {
      where.role = role
    }

    return await this.prisma.inMemoriam.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.inMemoriam.findFirst({
      where: {
        id,
      },
    })
  }

  async count({ filter: { name, biography, role } }: ICountInMemoriamDTO) {
    const where: Prisma.InMemoriamWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (biography) {
      where.biography = {
        contains: biography,
        mode: 'insensitive',
      }
    }

    if (role) {
      where.role = role
    }

    return await this.prisma.inMemoriam.count({
      where,
    })
  }
}
