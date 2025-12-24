import type {
  Prisma,
  PrismaClient,
} from '../../../../config/database/generated/client.ts'
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

  async deleteById(id: string) {
    await this.prisma.regionalCongressGalleryItem.delete({
      where: {
        id,
      },
    })
  }

  async findByCongressId({
    pagination: { offset, limit },
    filter: { congressId, caption, orderBy },
  }: IFindAllRegionalCongressGalleryByCongressIdDTO) {
    const where: Prisma.RegionalCongressGalleryItemWhereInput = {
      congressId,
    }

    if (caption) {
      where.caption = {
        contains: caption,
        mode: 'insensitive',
      }
    }

    return await this.prisma.regionalCongressGalleryItem.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.regionalCongressGalleryItem.findFirst({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { congressId, caption },
  }: ICountRegionalCongressGalleryDTO) {
    const where: Prisma.RegionalCongressGalleryItemWhereInput = {
      congressId,
    }

    if (caption) {
      where.caption = {
        contains: caption,
        mode: 'insensitive',
      }
    }

    return await this.prisma.regionalCongressGalleryItem.count({
      where,
    })
  }
}
