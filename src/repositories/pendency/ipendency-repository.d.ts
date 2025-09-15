import type { Pendency, User } from '@prisma/client'
import type {
  ICountPendenciesDTO,
  ICreatePendencyDTO,
  IFindByUserIdDTO,
  IFindPendenciesDTO,
  IUpdatePendencyDTO,
} from '../../dto/pendency.ts'

export interface IPendencyWithUser extends Pendency {
  user: Omit<User, 'passwordHash'>
}

export interface IPendencyRepository {
  create(data: ICreatePendencyDTO): Promise<void>
  find(data: IFindPendenciesDTO): Promise<IPendencyWithUser[]>
  findById(id: string): Promise<IPendencyWithUser | null>
  findByUserId(data: IFindByUserIdDTO): Promise<Pendency[]>
  update(data: IUpdatePendencyDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountPendenciesDTO): Promise<number>
}
