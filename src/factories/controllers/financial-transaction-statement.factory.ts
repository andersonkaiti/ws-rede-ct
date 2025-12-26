import { CreateFinancialTransactionStatementController } from '../../controllers/financial-transaction-statement/create-financial-transaction-statement-controller.ts'
import { FindFinancialTransactionStatementByIdController } from '../../controllers/financial-transaction-statement/find-financial-transaction-statement-by-id-controller.ts'
import { FindFinancialTransactionStatementsController } from '../../controllers/financial-transaction-statement/find-financial-transaction-statements-controller.ts'
import { FindLatestFinancialTransactionStatementController } from '../../controllers/financial-transaction-statement/find-latest-financial-transaction-statement-controller.ts'
import { UpdateFinancialTransactionStatementController } from '../../controllers/financial-transaction-statement/update-financial-transaction-statement-controller.ts'
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

export function makeFindFinancialTransactionStatementsController() {
  return {
    findFinancialTransactionStatementsController:
      new FindFinancialTransactionStatementsController(
        makeFinancialTransactionStatementRepository(),
      ),
  }
}

export function makeFindLatestFinancialTransactionStatementController() {
  return {
    findLatestFinancialTransactionStatementController:
      new FindLatestFinancialTransactionStatementController(
        makeFinancialTransactionStatementRepository(),
      ),
  }
}

export function makeFindFinancialTransactionStatementByIdController() {
  return {
    findFinancialTransactionStatementByIdController:
      new FindFinancialTransactionStatementByIdController(
        makeFinancialTransactionStatementRepository(),
      ),
  }
}

export function makeUpdateFinancialTransactionStatementController() {
  return {
    updateFinancialTransactionStatementController:
      new UpdateFinancialTransactionStatementController(
        makeFinancialTransactionStatementRepository(),
        makeFirebaseStorageService(),
      ),
  }
}
