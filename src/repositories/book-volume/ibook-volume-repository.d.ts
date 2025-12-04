import type { BookVolume } from '@prisma/client'
import type {
  ICountBookVolumesDTO,
  ICreateBookVolumeDTO,
  IFindBookVolumesDTO,
  IUpdateBookVolumeDTO,
} from '../../dto/book-volume.ts'

export interface IBookVolumeRepository {
  create(data: ICreateBookVolumeDTO): Promise<BookVolume>
  find(data: IFindBookVolumesDTO): Promise<BookVolume[] | null>
  update(data: IUpdateBookVolumeDTO): Promise<void>
  count(data: ICountBookVolumesDTO): Promise<number>
}
