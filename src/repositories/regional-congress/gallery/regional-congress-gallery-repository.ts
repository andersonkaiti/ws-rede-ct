import type { PrismaClient } from '@prisma/client'
import type {
  ICreateRegionalCongressGalleryDTO,
  IUpdateRegionalCongressGalleryDTO,
} from '../../../dto/regional-congress/gallery.js'
import type { IRegionalCongressGalleryRepository } from './iregional-congress-gallery-repository.js'

export class RegionalCongressGalleryRepository
  implements IRegionalCongressGalleryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(gallery: ICreateRegionalCongressGalleryDTO) {
    return await this.prisma.regionalCongressGalleryItem.create({
      data: gallery,
    })
  }

  async update(gallery: IUpdateRegionalCongressGalleryDTO) {
    await this.prisma.regionalCongressGalleryItem.update({
      where: {
        id: gallery.id,
      },
      data: gallery,
    })
  }
}
