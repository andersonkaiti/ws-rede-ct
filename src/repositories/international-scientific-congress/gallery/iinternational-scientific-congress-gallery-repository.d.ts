import type { CongressGalleryItem } from '@prisma/client'
import type {
  ICountCongressGalleryDTO,
  ICreateCongressGalleryDTO,
  IFindAllGalleryByCongressIdDTO,
  IUpdateCongressGalleryDTO,
} from '../../../dto/international-scientific-congress/gallery.js'

export interface IInternationalScientificCongressGalleryRepository {
  create(gallery: ICreateCongressGalleryDTO): Promise<CongressGalleryItem>
  update(gallery: IUpdateCongressGalleryDTO): Promise<void>
  deleteById(id: string): Promise<void>
  findByCongressId(
    data: IFindAllGalleryByCongressIdDTO
  ): Promise<CongressGalleryItem[] | null>
  findById(id: string): Promise<CongressGalleryItem | null>
  count(data: ICountCongressGalleryDTO): Promise<number>
}
