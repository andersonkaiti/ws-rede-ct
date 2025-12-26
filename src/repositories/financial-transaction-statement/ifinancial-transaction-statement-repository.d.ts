import type { FinancialTransactionStatement } from '../../../config/database/generated/client.ts'
import type {
  ICountFinancialTransactionStatementDTO,
  ICreateFinancialTransactionStatementDTO,
  IFindAllFinancialTransactionStatementDTO,
  IUpdateFinancialTransactionStatementDTO,
} from '../../dto/financial-transaction-statement.d.ts'

export interface IFinancialTransactionStatementRepository {
  create(
    statement: ICreateFinancialTransactionStatementDTO,
  ): Promise<FinancialTransactionStatement>
  update(statement: IUpdateFinancialTransactionStatementDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllFinancialTransactionStatementDTO,
  ): Promise<FinancialTransactionStatement[] | null>
  findById(id: string): Promise<FinancialTransactionStatement | null>
  count(data: ICountFinancialTransactionStatementDTO): Promise<number>
}
