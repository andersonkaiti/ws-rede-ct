import type { PrismaClient } from '../../../config/database/generated/client.ts'
import type { ICreateCheckingAccountDTO } from '../../dto/checking-account.d.ts'
import type { ICheckingAccountRepository } from './ichecking-account-repository.d.ts'

export class CheckingAccountRepository implements ICheckingAccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(account: ICreateCheckingAccountDTO) {
    await this.prisma.checkingAccount.create({
      data: account,
    })
  }
}
