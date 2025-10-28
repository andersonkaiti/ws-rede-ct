import type { PrismaClient } from '@prisma/client'
import type {
  ICreatePartnerDTO,
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
}
