import { CreateEventController } from '../../controllers/event/create-event-controller.ts'
import { makeEventRepository } from '../repositories/event.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateEventController() {
  return {
    createEventController: new CreateEventController(
      makeEventRepository(),
      makeFirebaseStorageService()
    ),
  }
}
