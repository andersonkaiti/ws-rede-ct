import type { PrismaClient } from '@prisma/client'
import type {
  ICreateCongressPartnerDTO,
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
}
