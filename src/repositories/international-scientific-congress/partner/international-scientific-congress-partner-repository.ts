import type { Prisma } from '../../../../config/database/generated/client.ts'
import type { PrismaClient } from '../../../config/database/generated/client.ts'
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
    return await this.prisma.internationalScientificCongressPartner.create({
      data: partner,
    })
  }

  async update(partner: IUpdateCongressPartnerDTO) {
    await this.prisma.internationalScientificCongressPartner.update({
      where: {
        id: partner.id,
      },
      data: partner,
    })
  }

  async deleteById(id: string) {
    await this.prisma.internationalScientificCongressPartner.delete({
      where: {
        id,
      },
    })
  }

  async findByCongressId({
    pagination: { offset, limit },
    filter: { congressId, name },
  }: IFindAllPartnersByCongressIdDTO) {
    const where: Prisma.InternationalScientificCongressPartnerWhereInput = {
      congressId,
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    return await this.prisma.internationalScientificCongressPartner.findMany({
      where,
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.internationalScientificCongressPartner.findFirst({
      where: {
        id,
      },
    })
  }

  async count(data: ICountCongressPartnerDTO) {
    const where: Prisma.InternationalScientificCongressPartnerWhereInput = {
      congressId: data.filter.congressId,
    }

    if (data.filter.name) {
      where.name = {
        contains: data.filter.name,
        mode: 'insensitive',
      }
    }

    return await this.prisma.internationalScientificCongressPartner.count({
      where,
    })
  }
}
