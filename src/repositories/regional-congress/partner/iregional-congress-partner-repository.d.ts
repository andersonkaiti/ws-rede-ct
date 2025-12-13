import type { RegionalCongressPartner } from '../../../../config/database/generated/client.ts'
import type {
  ICountRegionalCongressPartnerDTO,
  ICreateRegionalCongressPartnerDTO,
  IFindAllRegionalCongressPartnersByCongressIdDTO,
  IUpdateRegionalCongressPartnerDTO,
} from '../../../dto/regional-congress/partner.js'

export interface IRegionalCongressPartnerRepository {
  create(
    partner: ICreateRegionalCongressPartnerDTO,
  ): Promise<RegionalCongressPartner>
  update(partner: IUpdateRegionalCongressPartnerDTO): Promise<void>
  deleteById(id: string): Promise<void>
  findByCongressId(
    data: IFindAllRegionalCongressPartnersByCongressIdDTO,
  ): Promise<RegionalCongressPartner[] | null>
  findById(id: string): Promise<RegionalCongressPartner | null>
  count(data: ICountRegionalCongressPartnerDTO): Promise<number>
}
