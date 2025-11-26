import type { PrismaClient } from '@prisma/client'
import type {
  ICountCongressPartnerDTO,
  ICreateCongressPartnerDTO,
  IFindAllPartnersByCongressIdDTO,
  IUpdateCongressPartnerDTO,
} from '../../../dto/international-scientific-congress/partner.js'
import type { IInternationalScientificCongressPartnerRepository } from './international-scientific-congress-gallery-repository-partner-repository.js'

export class InternationalScientificCongressPartnerRepository
  implements IInternationalScientificCongressPartnerRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(partner: ICreateCongressPartnerDTO) {
    return await this.prisma.congressPartner.create({
      data: partner,
    })
  }

  async update(partner: IUpdateCongressPartnerDTO) {
    await this.prisma.congressPartner.update({
      where: {
        id: partner.id,
      },
      data: partner,
    })
  }

  async deleteById(id: string) {
    await this.prisma.congressPartner.delete({
      where: {
        id,
      },
    })
  }

  async findByCongressId(data: IFindAllPartnersByCongressIdDTO) {
    return await this.prisma.congressPartner.findMany({
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
    return await this.prisma.congressPartner.findFirst({
      where: {
        id,
      },
    })
  }

  async count(data: ICountCongressPartnerDTO) {
    return await this.prisma.congressPartner.count({
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
