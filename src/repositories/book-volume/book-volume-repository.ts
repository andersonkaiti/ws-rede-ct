import type { BookVolume, PrismaClient } from '@prisma/client'
import type {
  ICreateBookVolumeDTO,
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
}
