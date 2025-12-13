import { prisma } from '../../../../config/database/index.ts'
import { RegionalCongressGalleryRepository } from '../../../repositories/regional-congress/gallery/regional-congress-gallery-repository.ts'

export function makeRegionalCongressGalleryRepository() {
  return new RegionalCongressGalleryRepository(prisma)
}
