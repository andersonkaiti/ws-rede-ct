import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountPartnerDTO,
  ICreatePartnerDTO,
  IFindAllPartnerDTO,
  IUpdatePartnerDTO,
} from '../../dto/partner.d.ts'
import type { IPartnerRepository } from './ipartner-repository.d.ts'

export class PartnerRepository implements IPartnerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(partner: ICreatePartnerDTO) {
    return await this.prisma.partner.create({
      data: partner,
    })
  }

  async update(partner: IUpdatePartnerDTO) {
    return await this.prisma.partner.update({
      where: {
        id: partner.id,
      },
      data: partner,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { name, description, category, isActive, orderBy },
  }: IFindAllPartnerDTO) {
    const where: Prisma.PartnerWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      }
    }

    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive',
      }
    }

    if (isActive !== undefined) {
      where.isActive = isActive
    }

    return await this.prisma.partner.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.partner.findFirst({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { name, description, category, isActive },
  }: ICountPartnerDTO) {
    const where: Prisma.PartnerWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      }
    }

    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive',
      }
    }

    if (isActive !== undefined) {
      where.isActive = isActive
    }

    return await this.prisma.partner.count({
      where,
    })
  }
}
