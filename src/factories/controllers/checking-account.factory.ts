import { CreateCheckingAccountController } from '../../controllers/checking-account/create-checking-account-controller.ts'
import { DeleteCheckingAccountController } from '../../controllers/checking-account/delete-checking-account-controller.ts'
import { FindCheckingAccountByIdController } from '../../controllers/checking-account/find-checking-account-by-id-controller.ts'
import { FindCheckingAccountsController } from '../../controllers/checking-account/find-checking-accounts-controller.ts'
import { FindLatestByTypeController } from '../../controllers/checking-account/find-latest-by-type-controller.ts'
import { GetTotalBalanceController } from '../../controllers/checking-account/get-total-balance-controller.ts'
import { UpdateCheckingAccountController } from '../../controllers/checking-account/update-checking-account-controller.ts'
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

export function makeFindLatestByTypeController() {
  return {
    findLatestByTypeController: new FindLatestByTypeController(
      makeCheckingAccountRepository(),
    ),
  }
}

export function makeFindCheckingAccountByIdController() {
  return {
    findCheckingAccountByIdController: new FindCheckingAccountByIdController(
      makeCheckingAccountRepository(),
    ),
  }
}

export function makeUpdateCheckingAccountController() {
  return {
    updateCheckingAccountController: new UpdateCheckingAccountController(
      makeCheckingAccountRepository(),
    ),
  }
}

export function makeDeleteCheckingAccountController() {
  return {
    deleteCheckingAccountController: new DeleteCheckingAccountController(
      makeCheckingAccountRepository(),
    ),
  }
}
