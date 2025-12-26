import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICreateFinancialTransactionStatementDTO,
  IFindAllFinancialTransactionStatementDTO,
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

  async find({
    pagination: { offset, limit },
    filter: { orderBy },
  }: IFindAllFinancialTransactionStatementDTO) {
    const where: Prisma.FinancialTransactionStatementWhereInput = {}

    return await this.prisma.financialTransactionStatement.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.financialTransactionStatement.findFirst({
      where: {
        id,
      },
    })
  }

  async count() {
    return await this.prisma.financialTransactionStatement.count()
  }
}
