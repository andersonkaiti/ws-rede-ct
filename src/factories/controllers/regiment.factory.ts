import { CreateRegimentController } from '../../controllers/regiment/create-regiment-controller.ts'
import { FindRegimentByIdController } from '../../controllers/regiment/find-regiment-by-id-controller.ts'
import { FindRegimentsController } from '../../controllers/regiment/find-regiments-controller.ts'
import { makeRegimentRepository } from '../repositories/regiment.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateRegimentController() {
  return {
    createRegimentController: new CreateRegimentController(
      makeRegimentRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindRegimentsController() {
  return {
    findRegimentsController: new FindRegimentsController(
      makeRegimentRepository()
    ),
  }
}

export function makeFindRegimentByIdController() {
  return {
    findRegimentByIdController: new FindRegimentByIdController(
      makeRegimentRepository()
    ),
  }
}
