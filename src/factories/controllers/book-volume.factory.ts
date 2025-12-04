import { CreateBookVolumeController } from '../../controllers/book-volumes/create-book-volume-controller.ts'
import { FindBookVolumesController } from '../../controllers/book-volumes/find-book-volumes-controller.ts'
import { makeBookVolumeRepository } from '../repositories/book-volume.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateBookVolumeController() {
  return {
    createBookVolumeController: new CreateBookVolumeController(
      makeBookVolumeRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindBookVolumesController() {
  return {
    findBookVolumesController: new FindBookVolumesController(
      makeBookVolumeRepository()
    ),
  }
}
