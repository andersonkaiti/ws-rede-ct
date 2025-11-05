import type { Partner } from '@prisma/client'
import type {
  ICountPartnerDTO,
  ICreatePartnerDTO,
  IFindAllPartnerDTO,
  IUpdatePartnerDTO,
} from '../../dto/partner.d.ts'

export interface IPartnerRepository {
  create(partner: ICreatePartnerDTO): Promise<Partner>
  update(partner: IUpdatePartnerDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(data: IFindAllPartnerDTO): Promise<Partner[] | null>
  findById(id: string): Promise<Partner | null>
  count(data: ICountPartnerDTO): Promise<number>
}
