import { CreatePendencyController } from '../../controllers/pendencies/create-pendency-controller.ts'
import { DeletePendencyController } from '../../controllers/pendencies/delete-pendency-controller.ts'
import { FindPendenciesController } from '../../controllers/pendencies/find-pendencies-controller.ts'
import { FindPendencyByIdController } from '../../controllers/pendencies/find-pendency-by-id-controller.ts'
import { UpdatePendencyController } from '../../controllers/pendencies/update-pendency-controller.ts'
import { makePendencyRepository } from '../repositories/pendency.factory.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreatePendencyController() {
  return {
    createPendencyController: new CreatePendencyController(
      makeUserRepository(),
      makePendencyRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindPendenciesController() {
  return {
    findPendenciesController: new FindPendenciesController(
      makePendencyRepository(),
    ),
  }
}

export function makeFindPendencyByIdController() {
  return {
    findPendencyByIdController: new FindPendencyByIdController(
      makePendencyRepository(),
    ),
  }
}

export function makeUpdatePendencyController() {
  return {
    updatePendencyController: new UpdatePendencyController(
      makePendencyRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeletePendencyController() {
  return {
    deletePendencyController: new DeletePendencyController(
      makePendencyRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
