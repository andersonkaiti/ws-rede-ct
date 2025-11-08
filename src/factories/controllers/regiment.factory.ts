import { CreateRegimentController } from '../../controllers/regiment/create-regiment-controller.ts'
import { DeleteRegimentController } from '../../controllers/regiment/delete-regiment-controller.ts'
import { FindRegimentByIdController } from '../../controllers/regiment/find-regiment-by-id-controller.ts'
import { FindRegimentByStatusController } from '../../controllers/regiment/find-regiment-by-status-controller.ts'
import { FindRegimentsController } from '../../controllers/regiment/find-regiments-controller.ts'
import { UpdateRegimentController } from '../../controllers/regiment/update-regiment-controller.ts'
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

export function makeFindRegimentByStatusController() {
  return {
    findRegimentByStatusController: new FindRegimentByStatusController(
      makeRegimentRepository()
    ),
  }
}

export function makeUpdateRegimentController() {
  return {
    updateRegimentController: new UpdateRegimentController(
      makeRegimentRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeDeleteRegimentController() {
  return {
    deleteRegimentController: new DeleteRegimentController(
      makeRegimentRepository(),
      makeFirebaseStorageService()
    ),
  }
}
