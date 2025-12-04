import type { BookVolume, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountBookVolumesDTO,
  ICreateBookVolumeDTO,
  IFindBookVolumesDTO,
  IUpdateBookVolumeDTO,
} from '../../dto/book-volume.ts'
import type { IBookVolumeRepository } from './ibook-volume-repository.ts'

export class BookVolumeRepository implements IBookVolumeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    volumeNumber,
    year,
    title,
    author,
    accessUrl,
    authorImageUrl,
    coverImageUrl,
    catalogSheetUrl,
    description,
  }: ICreateBookVolumeDTO): Promise<BookVolume> {
    return await this.prisma.bookVolume.create({
      data: {
        volumeNumber,
        year,
        title,
        author,
        accessUrl,
        authorImageUrl,
        coverImageUrl,
        catalogSheetUrl,
        description,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, author, description, orderBy },
  }: IFindBookVolumesDTO): Promise<BookVolume[]> {
    const where: Prisma.BookVolumeWhereInput = {}

    const or: Prisma.BookVolumeWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (author) {
      or.push({
        author: {
          contains: author,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.bookVolume.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<BookVolume | null> {
    return await this.prisma.bookVolume.findFirst({
      where: {
        id,
      },
    })
  }

  async update({
    id,
    volumeNumber,
    year,
    title,
    author,
    accessUrl,
    authorImageUrl,
    coverImageUrl,
    catalogSheetUrl,
    description,
  }: IUpdateBookVolumeDTO): Promise<void> {
    await this.prisma.bookVolume.update({
      where: {
        id,
      },
      data: {
        volumeNumber,
        year,
        title,
        author,
        accessUrl,
        authorImageUrl,
        coverImageUrl,
        catalogSheetUrl,
        description,
      },
    })
  }

  async count({
    filter: { title, author, description },
  }: ICountBookVolumesDTO): Promise<number> {
    const where: Prisma.BookVolumeWhereInput = {}

    const or: Prisma.BookVolumeWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (author) {
      or.push({
        author: {
          contains: author,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.bookVolume.count({
      where,
    })
  }
}
