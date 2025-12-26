import { CreateFinancialTransactionStatementController } from '../../controllers/financial-transaction-statement/create-financial-transaction-statement-controller.ts'
import { makeFinancialTransactionStatementRepository } from '../repositories/financial-transaction-statement.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateFinancialTransactionStatementController() {
  return {
    createFinancialTransactionStatementController:
      new CreateFinancialTransactionStatementController(
        makeFinancialTransactionStatementRepository(),
        makeFirebaseStorageService(),
      ),
  }
}
