import type {
  Prisma,
  PrismaClient,
} from '../../../../config/database/generated/client.ts'
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

  async findByCongressId({
    pagination: { offset, limit },
    filter: { congressId, caption },
  }: IFindAllGalleryByCongressIdDTO) {
    const where: Prisma.InternationalScientificCongressGalleryItemWhereInput = {
      congressId,
    }

    if (caption) {
      where.caption = {
        contains: caption,
        mode: 'insensitive',
      }
    }

    return await this.prisma.internationalScientificCongressGalleryItem.findMany(
      {
        where,
        skip: offset,
        take: limit,
      },
    )
  }

  async findById(id: string) {
    return await this.prisma.internationalScientificCongressGalleryItem.findFirst(
      {
        where: {
          id,
        },
      },
    )
  }

  async count({ filter: { congressId, caption } }: ICountCongressGalleryDTO) {
    const where: Prisma.InternationalScientificCongressGalleryItemWhereInput = {
      congressId,
    }

    if (caption) {
      where.caption = {
        contains: caption,
        mode: 'insensitive',
      }
    }

    return await this.prisma.internationalScientificCongressGalleryItem.count({
      where,
    })
  }
}
