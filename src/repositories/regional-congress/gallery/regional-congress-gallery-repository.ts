import type { PrismaClient } from '@prisma/client'
import type {
  ICountRegionalCongressGalleryDTO,
  ICreateRegionalCongressGalleryDTO,
  IFindAllRegionalCongressGalleryByCongressIdDTO,
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

  async findByCongressId({
    pagination,
    filter,
  }: IFindAllRegionalCongressGalleryByCongressIdDTO) {
    return await this.prisma.regionalCongressGalleryItem.findMany({
      where: {
        congressId: filter.congressId,
        ...(filter.caption && {
          caption: {
            contains: filter.caption,
            mode: 'insensitive',
          },
        }),
      },
      skip: pagination.offset,
      take: pagination.limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.regionalCongressGalleryItem.findFirst({
      where: {
        id,
      },
    })
  }

  async count({ filter }: ICountRegionalCongressGalleryDTO) {
    return await this.prisma.regionalCongressGalleryItem.count({
      where: {
        congressId: filter.congressId,
        ...(filter.caption && {
          caption: {
            contains: filter.caption,
            mode: 'insensitive',
          },
        }),
      },
    })
  }
}
