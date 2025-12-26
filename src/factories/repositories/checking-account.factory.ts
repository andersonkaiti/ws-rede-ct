import { prisma } from '../../../config/database/index.ts'
import { CheckingAccountRepository } from '../../repositories/checking-account/checking-account-repository.ts'

export function makeCheckingAccountRepository() {
  return new CheckingAccountRepository(prisma)
}
