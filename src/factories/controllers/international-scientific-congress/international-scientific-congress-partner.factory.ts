import { CreateInternationalScientificCongressPartnerController } from '../../../controllers/international-scientific-congress-partner/create-international-scientific-congress-partner-controller.ts'
import { DeleteInternationalScientificCongressPartnerController } from '../../../controllers/international-scientific-congress-partner/delete-international-scientific-congress-partner-controller.ts'
import { FindInternationalScientificCongressPartnerByIdController } from '../../../controllers/international-scientific-congress-partner/find-international-scientific-congress-partner-by-id-controller.ts'
import { FindInternationalScientificCongressPartnersByCongressIdController } from '../../../controllers/international-scientific-congress-partner/find-international-scientific-congress-partners-by-congress-id-controller.ts'
import { UpdateInternationalScientificCongressPartnerController } from '../../../controllers/international-scientific-congress-partner/update-international-scientific-congress-partner-controller.ts'
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

export function makeFindInternationalScientificCongressPartnersByCongressIdController() {
  return {
    findInternationalScientificCongressPartnersByCongressIdController:
      new FindInternationalScientificCongressPartnersByCongressIdController(
        makeInternationalScientificCongressPartnerRepository()
      ),
  }
}

export function makeFindInternationalScientificCongressPartnerByIdController() {
  return {
    findInternationalScientificCongressPartnerByIdController:
      new FindInternationalScientificCongressPartnerByIdController(
        makeInternationalScientificCongressPartnerRepository()
      ),
  }
}

export function makeUpdateInternationalScientificCongressPartnerController() {
  return {
    updateInternationalScientificCongressPartnerController:
      new UpdateInternationalScientificCongressPartnerController(
        makeInternationalScientificCongressPartnerRepository(),
        makeFirebaseStorageService()
      ),
  }
}

export function makeDeleteInternationalScientificCongressPartnerController() {
  return {
    deleteInternationalScientificCongressPartnerController:
      new DeleteInternationalScientificCongressPartnerController(
        makeInternationalScientificCongressPartnerRepository()
      ),
  }
}
