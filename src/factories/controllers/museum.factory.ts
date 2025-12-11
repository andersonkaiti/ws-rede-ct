import { CreateMuseumController } from '../../controllers/museums/create-museum-controller.ts'
import { FindMuseumByIdController } from '../../controllers/museums/find-museum-by-id-controller.ts'
import { FindMuseumsController } from '../../controllers/museums/find-museums-controller.ts'
import { makeMuseumRepository } from '../repositories/museum.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateMuseumController() {
  return {
    createMuseumController: new CreateMuseumController(
      makeMuseumRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindMuseumsController() {
  return {
    findMuseumsController: new FindMuseumsController(makeMuseumRepository()),
  }
}

export function makeFindMuseumByIdController() {
  return {
    findMuseumByIdController: new FindMuseumByIdController(
      makeMuseumRepository()
    ),
  }
}
