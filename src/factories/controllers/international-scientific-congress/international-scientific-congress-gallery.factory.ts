import { CreateInternationalScientificCongressGalleryController } from '../../../controllers/international-scientific-congress-gallery/create-international-scientific-congress-gallery-controller.ts'
import { makeInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/international-scientific-congress.factory.ts'
import { makeInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/international-scientific-congress-gallery.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateInternationalScientificCongressGalleryController() {
  return {
    createInternationalScientificCongressGalleryController:
      new CreateInternationalScientificCongressGalleryController(
        makeInternationalScientificCongressGalleryRepository(),
        makeInternationalScientificCongressRepository(),
        makeFirebaseStorageService()
      ),
  }
}
