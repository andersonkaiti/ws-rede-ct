import type {
  Prisma,
  PrismaClient,
} from '../../../../config/database/generated/client.ts'
import type {
  ICountRegionalCongressPartnerDTO,
  ICreateRegionalCongressPartnerDTO,
  IFindAllRegionalCongressPartnersByCongressIdDTO,
  IUpdateRegionalCongressPartnerDTO,
} from '../../../dto/regional-congress/partner.js'
import type { IRegionalCongressPartnerRepository } from './iregional-congress-partner-repository.js'

export class RegionalCongressPartnerRepository
  implements IRegionalCongressPartnerRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(partner: ICreateRegionalCongressPartnerDTO) {
    return await this.prisma.regionalCongressPartner.create({
      data: partner,
    })
  }

  async update(partner: IUpdateRegionalCongressPartnerDTO) {
    await this.prisma.regionalCongressPartner.update({
      where: {
        id: partner.id,
      },
      data: partner,
    })
  }

  async deleteById(id: string) {
    await this.prisma.regionalCongressPartner.delete({
      where: {
        id,
      },
    })
  }

  async findByCongressId({
    pagination: { offset, limit },
    filter: { congressId, name, orderBy },
  }: IFindAllRegionalCongressPartnersByCongressIdDTO) {
    const where: Prisma.RegionalCongressPartnerWhereInput = {
      congressId,
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    return await this.prisma.regionalCongressPartner.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        updatedAt: orderBy,
      },
    })
  }

  async findById(id: string) {
    return await this.prisma.regionalCongressPartner.findFirst({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { congressId, name },
  }: ICountRegionalCongressPartnerDTO) {
    const where: Prisma.RegionalCongressPartnerWhereInput = {
      congressId,
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    return await this.prisma.regionalCongressPartner.count({
      where,
    })
  }
}
