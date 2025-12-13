import type { User } from '../../../config/database/generated/client.ts'
import type { ICreateUserDTO, IUpdateUserDTO } from '../../dto/user.d.ts'

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<void>
  update(user: IUpdateUserDTO): Promise<void>
  deleteById(user: string): Promise<void>
  find(): Promise<Omit<User, 'passwordHash'>[]>
  findByEmail(emailAddress: string): Promise<User | null>
  findById(id: string): Promise<Omit<User, 'passwordHash'> | null>
}
