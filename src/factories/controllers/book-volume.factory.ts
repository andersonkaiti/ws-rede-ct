import { CreateBookVolumeController } from '../../controllers/book-volumes/create-book-volume-controller.ts'
import { DeleteBookVolumeController } from '../../controllers/book-volumes/delete-book-volume-controller.ts'
import { FindBookVolumeByIdController } from '../../controllers/book-volumes/find-book-volume-by-id-controller.ts'
import { FindBookVolumesController } from '../../controllers/book-volumes/find-book-volumes-controller.ts'
import { UpdateBookVolumeController } from '../../controllers/book-volumes/update-book-volume-controller.ts'
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

export function makeFindBookVolumeByIdController() {
  return {
    findBookVolumeByIdController: new FindBookVolumeByIdController(
      makeBookVolumeRepository()
    ),
  }
}

export function makeUpdateBookVolumeController() {
  return {
    updateBookVolumeController: new UpdateBookVolumeController(
      makeBookVolumeRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeDeleteBookVolumeController() {
  return {
    deleteBookVolumeController: new DeleteBookVolumeController(
      makeBookVolumeRepository(),
      makeFirebaseStorageService()
    ),
  }
}
