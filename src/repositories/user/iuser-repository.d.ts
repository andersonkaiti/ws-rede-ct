import type { User } from '../../../config/database/generated/client.ts'
import type {
  ICountUsersDTO,
  ICreateUserDTO,
  IFindUsersDTO,
  IUpdateUserDTO,
} from '../../dto/user.d.ts'

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<void>
  update(user: IUpdateUserDTO): Promise<void>
  deleteById(user: string): Promise<void>
  find(params: IFindUsersDTO): Promise<Omit<User, 'passwordHash'>[]>
  count(params: ICountUsersDTO): Promise<number>
  findByEmail(emailAddress: string): Promise<User | null>
  findById(id: string): Promise<Omit<User, 'passwordHash'> | null>
}
