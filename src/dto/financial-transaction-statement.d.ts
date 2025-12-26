import type { FinancialTransactionStatement } from '../../config/database/generated/client.ts'

export interface ICreateFinancialTransactionStatementDTO {
  documentUrl: string
}

export interface IUpdateFinancialTransactionStatementDTO
  extends Partial<
    Omit<FinancialTransactionStatement, 'createdAt' | 'updatedAt'>
  > {
  id: string
}
