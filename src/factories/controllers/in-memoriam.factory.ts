import { CreateInMemoriamController } from '../../controllers/in-memoriam/create-in-memoriam-controller.ts'
import { DeleteInMemoriamController } from '../../controllers/in-memoriam/delete-in-memoriam-controller.ts'
import { FindInMemoriamByIdController } from '../../controllers/in-memoriam/find-in-memoriam-by-id-controller.ts'
import { FindInMemoriamController } from '../../controllers/in-memoriam/find-in-memoriam-controller.ts'
import { UpdateInMemoriamController } from '../../controllers/in-memoriam/update-in-memoriam-controller.ts'
import { makeInMemoriamRepository } from '../repositories/in-memoriam.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateInMemoriamController() {
  return {
    createInMemoriamController: new CreateInMemoriamController(
      makeInMemoriamRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindInMemoriamController() {
  return {
    findInMemoriamsController: new FindInMemoriamController(
      makeInMemoriamRepository()
    ),
  }
}

export function makeFindInMemoriamByIdController() {
  return {
    findInMemoriamByIdController: new FindInMemoriamByIdController(
      makeInMemoriamRepository()
    ),
  }
}

export function makeUpdateInMemoriamController() {
  return {
    updateInMemoriamController: new UpdateInMemoriamController(
      makeInMemoriamRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeDeleteInMemoriamController() {
  return {
    deleteInMemoriamController: new DeleteInMemoriamController(
      makeInMemoriamRepository(),
      makeFirebaseStorageService()
    ),
  }
}
