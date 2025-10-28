import { CreatePartnerController } from '../../controllers/partners/create-partner-controller.ts'
import { FindPartnersController } from '../../controllers/partners/find-partners-controller.ts'
import { makePartnerRepository } from '../repositories/partner.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreatePartnerController() {
  return {
    createPartnerController: new CreatePartnerController(
      makePartnerRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindPartnersController() {
  return {
    findPartnersController: new FindPartnersController(makePartnerRepository()),
  }
}
