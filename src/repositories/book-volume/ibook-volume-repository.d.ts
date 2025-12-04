import type { BookVolume } from '@prisma/client'
import type {
  ICreateBookVolumeDTO,
  IUpdateBookVolumeDTO,
} from '../../dto/book-volume.ts'

export interface IBookVolumeRepository {
  create(data: ICreateBookVolumeDTO): Promise<BookVolume>
  update(data: IUpdateBookVolumeDTO): Promise<void>
}
