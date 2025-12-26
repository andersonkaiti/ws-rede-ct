import type { FinancialTransactionStatement } from '../../config/database/generated/client.ts'

export interface ICreateFinancialTransactionStatementDTO {
  documentUrl: string
}

export interface IFindAllFinancialTransactionStatementDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateFinancialTransactionStatementDTO
  extends Partial<
    Omit<FinancialTransactionStatement, 'createdAt' | 'updatedAt'>
  > {
  id: string
}

export interface ICountFinancialTransactionStatementDTO {
  filter: Record<string, never>
}
