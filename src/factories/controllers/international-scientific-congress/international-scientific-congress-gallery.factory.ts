import { CreateInternationalScientificCongressGalleryController } from '../../../controllers/international-scientific-congress-gallery/create-international-scientific-congress-gallery-controller.ts'
import { FindInternationalScientificCongressGalleriesByCongressIdController } from '../../../controllers/international-scientific-congress-gallery/find-international-scientific-congress-galleries-by-congress-id-controller.ts'
import { FindInternationalScientificCongressGalleryByIdController } from '../../../controllers/international-scientific-congress-gallery/find-international-scientific-congress-gallery-by-id-controller.ts'
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

export function makeFindInternationalScientificCongressGalleriesByCongressIdController() {
  return {
    findInternationalScientificCongressGalleriesByCongressIdController:
      new FindInternationalScientificCongressGalleriesByCongressIdController(
        makeInternationalScientificCongressGalleryRepository()
      ),
  }
}

export function makeFindInternationalScientificCongressGalleryByIdController() {
  return {
    findInternationalScientificCongressGalleryByIdController:
      new FindInternationalScientificCongressGalleryByIdController(
        makeInternationalScientificCongressGalleryRepository()
      ),
  }
}
