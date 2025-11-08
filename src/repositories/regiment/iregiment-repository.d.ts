import type { Regiment } from '@prisma/client'
import type {
  ICreateRegimentDTO,
  IUpdateRegimentDTO,
} from '../../dto/regiment.d.ts'

export interface IRegimentRepository {
  create(regiment: ICreateRegimentDTO): Promise<Regiment>
  update(regiment: IUpdateRegimentDTO): Promise<void>
}
