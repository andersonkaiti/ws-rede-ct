import type { CongressGalleryItem } from '@prisma/client'
import type {
  ICreateCongressGalleryDTO,
  IUpdateCongressGalleryDTO,
} from '../../../dto/international-scientific-congress/gallery.js'

export interface IInternationalScientificCongressGalleryRepository {
  create(gallery: ICreateCongressGalleryDTO): Promise<CongressGalleryItem>
  update(gallery: IUpdateCongressGalleryDTO): Promise<void>
}
