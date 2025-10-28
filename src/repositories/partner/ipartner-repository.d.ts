import type { Partner } from '@prisma/client'
import type {
  ICreatePartnerDTO,
  IUpdatePartnerDTO,
} from '../../dto/partner.d.ts'

export interface IPartnerRepository {
  create(partner: ICreatePartnerDTO): Promise<Partner>
  update(partner: IUpdatePartnerDTO): Promise<Partner>
}
