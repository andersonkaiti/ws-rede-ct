import { CreateWebinarController } from '../../controllers/webinars/create-webinar-controller.ts'
import { DeleteWebinarController } from '../../controllers/webinars/delete-webinar-controller.ts'
import { FindWebinarByIdController } from '../../controllers/webinars/find-webinar-by-id-controller.ts'
import { FindWebinarsController } from '../../controllers/webinars/find-webinars-controller.ts'
import { UpdateWebinarController } from '../../controllers/webinars/update-webinar-controller.ts'
import { makeWebinarRepository } from '../repositories/webinar.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateWebinarController() {
  return {
    createWebinarController: new CreateWebinarController(
      makeWebinarRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindWebinarsController() {
  return {
    findWebinarsController: new FindWebinarsController(makeWebinarRepository()),
  }
}

export function makeFindWebinarByIdController() {
  return {
    findWebinarByIdController: new FindWebinarByIdController(
      makeWebinarRepository(),
    ),
  }
}

export function makeUpdateWebinarController() {
  return {
    updateWebinarController: new UpdateWebinarController(
      makeWebinarRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeleteWebinarController() {
  return {
    deleteWebinarController: new DeleteWebinarController(
      makeWebinarRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
