import type { Regiment } from '@prisma/client'
import type {
  ICountRegimentDTO,
  ICreateRegimentDTO,
  IFindAllRegimentDTO,
  IUpdateRegimentDTO,
} from '../../dto/regiment.d.ts'

export interface IRegimentRepository {
  create(regiment: ICreateRegimentDTO): Promise<Regiment>
  update(regiment: IUpdateRegimentDTO): Promise<void>
  find(data: IFindAllRegimentDTO): Promise<Regiment[] | null>
  findById(id: string): Promise<Regiment | null>
  count(data: ICountRegimentDTO): Promise<number>
}
