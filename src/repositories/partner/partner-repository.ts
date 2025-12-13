import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
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
    await this.prisma.partner.update({
      where: {
        id: partner.id,
      },
      data: partner,
    })
  }

  async deleteById(id: string) {
    await this.prisma.partner.delete({
      where: { id },
    })
  }

  async find({
    pagination,
    filter: { name, description, category, isActive, orderBy },
  }: IFindAllPartnerDTO) {
    const where: Prisma.PartnerWhereInput = {}

    const or: Prisma.PartnerWhereInput[] = []

    if (isActive !== undefined) {
      where.isActive = isActive
    }

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (category) {
      or.push({
        category: {
          contains: category,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.partner.findMany({
      where,
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
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

    const or: Prisma.PartnerWhereInput[] = []

    if (isActive !== undefined) {
      where.isActive = isActive
    }

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (category) {
      or.push({
        category: {
          contains: category,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.partner.count({
      where,
    })
  }
}
