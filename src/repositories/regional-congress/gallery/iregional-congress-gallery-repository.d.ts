import type { RegionalCongressGalleryItem } from '@prisma/client'
import type {
  ICreateRegionalCongressGalleryDTO,
  IUpdateRegionalCongressGalleryDTO,
} from '../../../dto/regional-congress/gallery.js'

export interface IRegionalCongressGalleryRepository {
  create(
    gallery: ICreateRegionalCongressGalleryDTO
  ): Promise<RegionalCongressGalleryItem>
  update(gallery: IUpdateRegionalCongressGalleryDTO): Promise<void>
}
