import { prisma } from '../../../config/database/index.ts'
import { FinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/financial-transaction-statement-repository.ts'

export function makeFinancialTransactionStatementRepository() {
  return new FinancialTransactionStatementRepository(prisma)
}
