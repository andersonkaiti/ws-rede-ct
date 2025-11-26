import type { CongressPartner } from '@prisma/client'
import type {
  ICreateCongressPartnerDTO,
  IUpdateCongressPartnerDTO,
} from '../../../dto/international-scientific-congress/partner.js'

export interface IInternationalScientificCongressPartnerRepository {
  create(partner: ICreateCongressPartnerDTO): Promise<CongressPartner>
  update(partner: IUpdateCongressPartnerDTO): Promise<void>
}
