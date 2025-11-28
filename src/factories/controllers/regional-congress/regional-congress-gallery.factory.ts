import { CreateRegionalCongressGalleryController } from '../../../controllers/regional-congress-gallery/create-regional-congress-gallery-controller.ts'
import { makeRegionalCongressRepository } from '../../repositories/regional-congress/regional-congress.factory.ts'
import { makeRegionalCongressGalleryRepository } from '../../repositories/regional-congress/regional-congress-gallery.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateRegionalCongressGalleryController() {
  return {
    createRegionalCongressGalleryController:
      new CreateRegionalCongressGalleryController(
        makeRegionalCongressGalleryRepository(),
        makeRegionalCongressRepository(),
        makeFirebaseStorageService()
      ),
  }
}
