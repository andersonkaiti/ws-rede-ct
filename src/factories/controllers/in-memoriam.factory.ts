import { CreateInMemoriamController } from '../../controllers/in-memoriam/create-in-memoriam-controller.ts'
import { FindInMemoriamController } from '../../controllers/in-memoriam/find-in-memoriam-controller.ts'
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
