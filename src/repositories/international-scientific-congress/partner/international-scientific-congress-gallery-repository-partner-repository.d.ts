import type { CongressPartner } from '../../../config/database/generated/client.ts'
import type {
  ICountCongressPartnerDTO,
  ICreateCongressPartnerDTO,
  IFindAllPartnersByCongressIdDTO,
  IUpdateCongressPartnerDTO,
} from '../../../dto/international-scientific-congress/partner.js'

export interface IInternationalScientificCongressPartnerRepository {
  create(partner: ICreateCongressPartnerDTO): Promise<CongressPartner>
  update(partner: IUpdateCongressPartnerDTO): Promise<void>
  deleteById(id: string): Promise<void>
  findByCongressId(
    data: IFindAllPartnersByCongressIdDTO,
  ): Promise<CongressPartner[] | null>
  findById(id: string): Promise<CongressPartner | null>
  count(data: ICountCongressPartnerDTO): Promise<number>
}
