import { CreateInternationalScientificCongressPartnerController } from '../../../controllers/international-scientific-congress-partner/create-international-scientific-congress-partner-controller.ts'
import { makeInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/international-scientific-congress.factory.ts'
import { makeInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/international-scientific-congress-partner.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateInternationalScientificCongressPartnerController() {
  return {
    createInternationalScientificCongressPartnerController:
      new CreateInternationalScientificCongressPartnerController(
        makeInternationalScientificCongressPartnerRepository(),
        makeInternationalScientificCongressRepository(),
        makeFirebaseStorageService()
      ),
  }
}
