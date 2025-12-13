import type { PrismaClient } from '../../../../config/database/generated/client.ts'
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

  async findByCongressId(
    data: IFindAllRegionalCongressPartnersByCongressIdDTO,
  ) {
    return await this.prisma.regionalCongressPartner.findMany({
      where: {
        congressId: data.filter.congressId,
        name: data.filter.name
          ? {
              contains: data.filter.name,
              mode: 'insensitive',
            }
          : undefined,
      },
      skip: data.pagination?.offset,
      take: data.pagination?.limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.regionalCongressPartner.findFirst({
      where: {
        id,
      },
    })
  }

  async count(data: ICountRegionalCongressPartnerDTO) {
    return await this.prisma.regionalCongressPartner.count({
      where: {
        congressId: data.filter.congressId,
        name: data.filter.name
          ? {
              contains: data.filter.name,
              mode: 'insensitive',
            }
          : undefined,
      },
    })
  }
}
