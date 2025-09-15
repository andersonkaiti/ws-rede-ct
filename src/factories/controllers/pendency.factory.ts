import { CreatePendencyController } from '../../controllers/pendencies/create-pendency-controller.ts'
import { makePendencyRepository } from '../repositories/pendency.factory.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreatePendencyController() {
  return {
    createPendencyController: new CreatePendencyController(
      makeUserRepository(),
      makePendencyRepository(),
      makeFirebaseStorageService()
    ),
  }
}
