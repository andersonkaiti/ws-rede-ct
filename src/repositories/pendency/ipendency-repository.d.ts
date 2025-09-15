import type { Pendency, User } from '@prisma/client'
import type {
  ICountPendenciesDTO,
  ICreatePendencyDTO,
  IFindPendenciesDTO,
} from '../../dto/pendency.ts'

export interface IPendencyWithUser extends Pendency {
  user: Omit<User, 'passwordHash'>
}

export interface IPendencyRepository {
  create(data: ICreatePendencyDTO): Promise<void>
  find(data: IFindPendenciesDTO): Promise<IPendencyWithUser[]>
  count(data: ICountPendenciesDTO): Promise<number>
}
