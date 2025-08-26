import { prisma } from '../../../config/database.ts'
import { UserRepository } from '../../repositories/user/user-repository.ts'

export function makeUserRepository() {
  return new UserRepository(prisma)
}
