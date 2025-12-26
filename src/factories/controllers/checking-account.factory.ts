import { CreateCheckingAccountController } from '../../controllers/checking-account/create-checking-account-controller.ts'
import { FindCheckingAccountsController } from '../../controllers/checking-account/find-checking-accounts-controller.ts'
import { GetTotalBalanceController } from '../../controllers/checking-account/get-total-balance-controller.ts'
import { makeCheckingAccountRepository } from '../repositories/checking-account.factory.ts'

export function makeCreateCheckingAccountController() {
  return {
    createCheckingAccountController: new CreateCheckingAccountController(
      makeCheckingAccountRepository(),
    ),
  }
}

export function makeFindCheckingAccountsController() {
  return {
    findCheckingAccountsController: new FindCheckingAccountsController(
      makeCheckingAccountRepository(),
    ),
  }
}

export function makeGetTotalBalanceController() {
  return {
    getTotalBalanceController: new GetTotalBalanceController(
      makeCheckingAccountRepository(),
    ),
  }
}
