import type { RegionalCongressPartner } from '@prisma/client'
import type {
  ICreateRegionalCongressPartnerDTO,
  IUpdateRegionalCongressPartnerDTO,
} from '../../../dto/regional-congress/partner.js'

export interface IRegionalCongressPartnerRepository {
  create(
    partner: ICreateRegionalCongressPartnerDTO
  ): Promise<RegionalCongressPartner>
  update(partner: IUpdateRegionalCongressPartnerDTO): Promise<void>
}
