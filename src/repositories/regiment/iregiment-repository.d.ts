import type {
  Regiment,
  RegimentStatus,
} from '../../../config/database/generated/client.ts'
import type {
  ICountRegimentDTO,
  ICreateRegimentDTO,
  IFindAllRegimentDTO,
  IUpdateRegimentDTO,
} from '../../dto/regiment.d.ts'

export interface IRegimentRepository {
  create(regiment: ICreateRegimentDTO): Promise<Regiment>
  update(regiment: IUpdateRegimentDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(data: IFindAllRegimentDTO): Promise<Regiment[] | null>
  findById(id: string): Promise<Regiment | null>
  findByStatus(status: RegimentStatus): Promise<Regiment[] | null>
  count(data: ICountRegimentDTO): Promise<number>
}
