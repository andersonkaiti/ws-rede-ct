import type {
  RegionalCongress,
  RegionalCongressGalleryItem,
  RegionalCongressPartner,
} from '@prisma/client'
import type {
  ICountRegionalCongressDTO,
  ICreateRegionalCongressDTO,
  IFindAllRegionalCongressDTO,
} from '../../dto/regional-congress/regional-congress.js'

export interface RegionalCongressWithRelations extends RegionalCongress {
  regionalCongressPartners: RegionalCongressPartner[]
  regionalCongressGalleryItems: RegionalCongressGalleryItem[]
}

export interface IRegionalCongressRepository {
  create(congress: ICreateRegionalCongressDTO): Promise<void>
  find(
    data: IFindAllRegionalCongressDTO
  ): Promise<RegionalCongressWithRelations[] | null>
  findById(id: string): Promise<RegionalCongressWithRelations | null>
  count(data: ICountRegionalCongressDTO): Promise<number>
}
