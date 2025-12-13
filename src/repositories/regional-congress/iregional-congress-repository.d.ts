import type {
  RegionalCongress,
  RegionalCongressGalleryItem,
  RegionalCongressPartner,
} from '../../../config/database/generated/client.ts'
import type {
  ICountRegionalCongressDTO,
  ICreateRegionalCongressDTO,
  IFindAllRegionalCongressDTO,
  IUpdateRegionalCongressDTO,
} from '../../dto/regional-congress/regional-congress.js'

export interface RegionalCongressWithRelations extends RegionalCongress {
  regionalCongressPartners: RegionalCongressPartner[]
  regionalCongressGalleryItems: RegionalCongressGalleryItem[]
}

export interface IRegionalCongressRepository {
  create(congress: ICreateRegionalCongressDTO): Promise<void>
  update(congress: IUpdateRegionalCongressDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllRegionalCongressDTO,
  ): Promise<RegionalCongressWithRelations[] | null>
  findById(id: string): Promise<RegionalCongressWithRelations | null>
  findByEdition(
    edition: number,
  ): Promise<RegionalCongressWithRelations[] | null>
  count(data: ICountRegionalCongressDTO): Promise<number>
}
