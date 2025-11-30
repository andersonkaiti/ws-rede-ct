import { CreateWebinarController } from '../../controllers/webinars/create-webinar-controller.ts'
import { FindWebinarsController } from '../../controllers/webinars/find-webinars-controller.ts'
import { makeWebinarRepository } from '../repositories/webinar.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateWebinarController() {
  return {
    createWebinarController: new CreateWebinarController(
      makeWebinarRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindWebinarsController() {
  return {
    findWebinarsController: new FindWebinarsController(makeWebinarRepository()),
  }
}
