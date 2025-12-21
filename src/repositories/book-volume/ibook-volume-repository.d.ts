import type {
  BookVolume,
  User,
} from '../../../config/database/generated/client.ts'
import type {
  ICountBookVolumesDTO,
  ICreateBookVolumeDTO,
  IFindBookVolumesDTO,
  IUpdateBookVolumeDTO,
} from '../../dto/book-volume.ts'

export type BookVolumeWithAuthor = Omit<BookVolume, 'authorId'> & {
  author: User
}

export interface IBookVolumeRepository {
  create(data: ICreateBookVolumeDTO): Promise<BookVolume>
  find(data: IFindBookVolumesDTO): Promise<BookVolumeWithAuthor[] | null>
  findById(id: string): Promise<BookVolumeWithAuthor | null>
  update(data: IUpdateBookVolumeDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountBookVolumesDTO): Promise<number>
}
