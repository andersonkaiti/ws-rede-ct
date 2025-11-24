import type { PrismaClient } from '@prisma/client'
import type {
  ICreateCongressGalleryDTO,
  IUpdateCongressGalleryDTO,
} from '../../../dto/international-scientific-congress/gallery.js'
import type { IInternationalScientificCongressGalleryRepository } from './iinternational-scientific-congress-gallery-repository.js'

export class InternationalScientificCongressGalleryRepository
  implements IInternationalScientificCongressGalleryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(gallery: ICreateCongressGalleryDTO) {
    return await this.prisma.congressGalleryItem.create({
      data: gallery,
    })
  }

  async update(gallery: IUpdateCongressGalleryDTO) {
    await this.prisma.congressGalleryItem.update({
      where: {
        id: gallery.id,
      },
      data: gallery,
    })
  }
}
