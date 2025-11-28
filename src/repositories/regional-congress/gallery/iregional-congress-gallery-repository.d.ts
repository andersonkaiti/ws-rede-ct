import type { RegionalCongressGalleryItem } from '@prisma/client'
import type {
  ICountRegionalCongressGalleryDTO,
  ICreateRegionalCongressGalleryDTO,
  IFindAllRegionalCongressGalleryByCongressIdDTO,
  IUpdateRegionalCongressGalleryDTO,
} from '../../../dto/regional-congress/gallery.js'

export interface IRegionalCongressGalleryRepository {
  create(
    gallery: ICreateRegionalCongressGalleryDTO
  ): Promise<RegionalCongressGalleryItem>
  update(gallery: IUpdateRegionalCongressGalleryDTO): Promise<void>
  findByCongressId(
    data: IFindAllRegionalCongressGalleryByCongressIdDTO
  ): Promise<RegionalCongressGalleryItem[] | null>
  findById(id: string): Promise<RegionalCongressGalleryItem | null>
  count(data: ICountRegionalCongressGalleryDTO): Promise<number>
}
