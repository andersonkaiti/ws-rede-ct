import { CreateRegimentController } from '../../controllers/regiment/create-regiment-controller.ts'
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
