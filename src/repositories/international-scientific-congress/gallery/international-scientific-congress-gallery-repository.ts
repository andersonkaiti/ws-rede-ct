import type { PrismaClient } from '@prisma/client'
import type {
  ICountCongressGalleryDTO,
  ICreateCongressGalleryDTO,
  IFindAllGalleryByCongressIdDTO,
  IUpdateCongressGalleryDTO,
} from '../../../dto/international-scientific-congress/gallery.js'
import type { IInternationalScientificCongressGalleryRepository } from './iinternational-scientific-congress-gallery-repository.js'

export class InternationalScientificCongressGalleryRepository
  implements IInternationalScientificCongressGalleryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(gallery: ICreateCongressGalleryDTO) {
    return await this.prisma.internationalScientificCongressGalleryItem.create({
      data: gallery,
    })
  }

  async update(gallery: IUpdateCongressGalleryDTO) {
    await this.prisma.internationalScientificCongressGalleryItem.update({
      where: {
        id: gallery.id,
      },
      data: gallery,
    })
  }

  async deleteById(id: string) {
    await this.prisma.internationalScientificCongressGalleryItem.delete({
      where: {
        id,
      },
    })
  }

  async findByCongressId(data: IFindAllGalleryByCongressIdDTO) {
    const { pagination, filter } = data

    return await this.prisma.internationalScientificCongressGalleryItem.findMany(
      {
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
      }
    )
  }

  async findById(id: string) {
    return await this.prisma.internationalScientificCongressGalleryItem.findFirst(
      {
        where: {
          id,
        },
      }
    )
  }

  async count(data: ICountCongressGalleryDTO) {
    const { filter } = data

    return await this.prisma.internationalScientificCongressGalleryItem.count({
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
