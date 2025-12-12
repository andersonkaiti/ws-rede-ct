import { prisma } from '../../../../config/database/index.ts'
import { InternationalScientificCongressGalleryRepository } from '../../../repositories/international-scientific-congress/gallery/international-scientific-congress-gallery-repository.ts'

export function makeInternationalScientificCongressGalleryRepository() {
  return new InternationalScientificCongressGalleryRepository(prisma)
}
