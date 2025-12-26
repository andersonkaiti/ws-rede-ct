import { CreateCheckingAccountController } from '../../controllers/checking-account/create-checking-account-controller.ts'
import { makeCheckingAccountRepository } from '../repositories/checking-account.factory.ts'

export function makeCreateCheckingAccountController() {
  return {
    createCheckingAccountController: new CreateCheckingAccountController(
      makeCheckingAccountRepository(),
    ),
  }
}
