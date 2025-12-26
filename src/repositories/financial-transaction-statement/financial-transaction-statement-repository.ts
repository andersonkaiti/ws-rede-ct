import type { PrismaClient } from '../../../config/database/generated/client.ts'
import type {
  ICreateFinancialTransactionStatementDTO,
  IUpdateFinancialTransactionStatementDTO,
} from '../../dto/financial-transaction-statement.d.ts'
import type { IFinancialTransactionStatementRepository } from './ifinancial-transaction-statement-repository.d.ts'

export class FinancialTransactionStatementRepository
  implements IFinancialTransactionStatementRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(statement: ICreateFinancialTransactionStatementDTO) {
    return await this.prisma.financialTransactionStatement.create({
      data: statement,
    })
  }

  async update(statement: IUpdateFinancialTransactionStatementDTO) {
    await this.prisma.financialTransactionStatement.update({
      where: {
        id: statement.id,
      },
      data: statement,
    })
  }
}
