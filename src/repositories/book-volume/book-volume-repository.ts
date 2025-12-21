import type {
  BookVolume,
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountBookVolumesDTO,
  ICreateBookVolumeDTO,
  IFindBookVolumesDTO,
  IUpdateBookVolumeDTO,
} from '../../dto/book-volume.ts'
import type {
  BookVolumeWithAuthor,
  IBookVolumeRepository,
} from './ibook-volume-repository.ts'

export class BookVolumeRepository implements IBookVolumeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    volumeNumber,
    year,
    title,
    authorId,
    accessUrl,
    coverImageUrl,
    catalogSheetUrl,
    description,
  }: ICreateBookVolumeDTO): Promise<BookVolume> {
    return await this.prisma.bookVolume.create({
      data: {
        volumeNumber,
        year,
        title,
        authorId,
        accessUrl,
        coverImageUrl,
        catalogSheetUrl,
        description,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { title, author, description, orderBy },
  }: IFindBookVolumesDTO): Promise<BookVolumeWithAuthor[]> {
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
          name: {
            contains: author,
            mode: 'insensitive',
          },
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
      omit: {
        authorId: true,
      },
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<BookVolumeWithAuthor | null> {
    return await this.prisma.bookVolume.findFirst({
      where: {
        id,
      },
      omit: {
        authorId: true,
      },
      include: {
        author: true,
      },
    })
  }

  async update({
    id,
    volumeNumber,
    year,
    title,
    authorId,
    accessUrl,
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
        authorId,
        accessUrl,
        coverImageUrl,
        catalogSheetUrl,
        description,
      },
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.bookVolume.delete({
      where: {
        id,
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
          name: {
            contains: author,
            mode: 'insensitive',
          },
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
