import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountLawsDTO,
  ICreateLawDTO,
  IFindAllLawsDTO,
  IUpdateLawDTO,
} from '../../dto/law.d.ts'
import type { ILawRepository } from './ilaw-repository.d.ts'

export class LawRepository implements ILawRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(law: ICreateLawDTO) {
    await this.prisma.law.create({
      data: {
        ...law,
      },
    })
  }

  async update(law: IUpdateLawDTO) {
    const { id, ...lawData } = law

    await this.prisma.law.update({
      where: {
        id,
      },
      data: lawData,
    })
  }

  async deleteById(id: string) {
    await this.prisma.law.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination,
    filter: { title, country, orderBy },
  }: IFindAllLawsDTO) {
    const where: Prisma.LawWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (country) {
      where.country = {
        contains: country,
        mode: 'insensitive',
      }
    }

    return await this.prisma.law.findMany({
      where,
      orderBy: {
        updatedAt: orderBy ?? 'desc',
      },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
    })
  }

  async findById(id: string) {
    return await this.prisma.law.findFirst({
      where: {
        id,
      },
    })
  }

  async count({ filter: { title, country } }: ICountLawsDTO) {
    const where: Prisma.LawWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (country) {
      where.country = {
        contains: country,
        mode: 'insensitive',
      }
    }

    return await this.prisma.law.count({
      where,
    })
  }
}
