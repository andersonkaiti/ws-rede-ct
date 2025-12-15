import { CreateRegionalCongressGalleryController } from '../../../controllers/regional-congress-gallery/create-regional-congress-gallery-controller.ts'
import { DeleteRegionalCongressGalleryController } from '../../../controllers/regional-congress-gallery/delete-regional-congress-gallery-controller.ts'
import { FindRegionalCongressGalleriesByCongressIdController } from '../../../controllers/regional-congress-gallery/find-regional-congress-galleries-by-congress-id-controller.ts'
import { FindRegionalCongressGalleryByIdController } from '../../../controllers/regional-congress-gallery/find-regional-congress-gallery-by-id-controller.ts'
import { UpdateRegionalCongressGalleryController } from '../../../controllers/regional-congress-gallery/update-regional-congress-gallery-controller.ts'
import { makeRegionalCongressRepository } from '../../repositories/regional-congress/regional-congress.factory.ts'
import { makeRegionalCongressGalleryRepository } from '../../repositories/regional-congress/regional-congress-gallery.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateRegionalCongressGalleryController() {
  return {
    createRegionalCongressGalleryController:
      new CreateRegionalCongressGalleryController(
        makeRegionalCongressGalleryRepository(),
        makeRegionalCongressRepository(),
        makeFirebaseStorageService(),
      ),
  }
}

export function makeFindRegionalCongressGalleriesByCongressIdController() {
  return {
    findRegionalCongressGalleriesByCongressIdController:
      new FindRegionalCongressGalleriesByCongressIdController(
        makeRegionalCongressGalleryRepository(),
      ),
  }
}

export function makeFindRegionalCongressGalleryByIdController() {
  return {
    findRegionalCongressGalleryByIdController:
      new FindRegionalCongressGalleryByIdController(
        makeRegionalCongressGalleryRepository(),
      ),
  }
}

export function makeUpdateRegionalCongressGalleryController() {
  return {
    updateRegionalCongressGalleryController:
      new UpdateRegionalCongressGalleryController(
        makeRegionalCongressGalleryRepository(),
        makeFirebaseStorageService(),
      ),
  }
}

export function makeDeleteRegionalCongressGalleryController() {
  return {
    deleteRegionalCongressGalleryController:
      new DeleteRegionalCongressGalleryController(
        makeRegionalCongressGalleryRepository(),
      ),
  }
}
