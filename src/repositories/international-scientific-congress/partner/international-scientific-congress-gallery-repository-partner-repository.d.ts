import type { CongressPartner } from '@prisma/client'
import type {
  ICountCongressPartnerDTO,
  ICreateCongressPartnerDTO,
  IFindAllPartnersByCongressIdDTO,
  IUpdateCongressPartnerDTO,
} from '../../../dto/international-scientific-congress/partner.js'

export interface IInternationalScientificCongressPartnerRepository {
  create(partner: ICreateCongressPartnerDTO): Promise<CongressPartner>
  update(partner: IUpdateCongressPartnerDTO): Promise<void>
  findByCongressId(
    data: IFindAllPartnersByCongressIdDTO
  ): Promise<CongressPartner[] | null>
  findById(id: string): Promise<CongressPartner | null>
  count(data: ICountCongressPartnerDTO): Promise<number>
}
