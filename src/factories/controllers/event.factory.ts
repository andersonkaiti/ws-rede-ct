import { CreateEventController } from '../../controllers/event/create-event-controller.ts'
import { FindEventByIdController } from '../../controllers/event/find-event-by-id-controller.ts'
import { FindEventsController } from '../../controllers/event/find-events-controller.ts'
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

export function makeFindEventsController() {
  return {
    findEventsController: new FindEventsController(makeEventRepository()),
  }
}

export function makeFindEventByIdController() {
  return {
    findEventByIdController: new FindEventByIdController(makeEventRepository()),
  }
}
