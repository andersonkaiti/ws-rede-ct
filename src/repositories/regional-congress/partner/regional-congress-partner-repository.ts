import type { PrismaClient } from '@prisma/client'
import type {
  ICreateRegionalCongressPartnerDTO,
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
}
