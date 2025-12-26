import type { FinancialTransactionStatement } from '../../../config/database/generated/client.ts'
import type {
  ICreateFinancialTransactionStatementDTO,
  IUpdateFinancialTransactionStatementDTO,
} from '../../dto/financial-transaction-statement.d.ts'

export interface IFinancialTransactionStatementRepository {
  create(
    statement: ICreateFinancialTransactionStatementDTO,
  ): Promise<FinancialTransactionStatement>
  update(statement: IUpdateFinancialTransactionStatementDTO): Promise<void>
}
