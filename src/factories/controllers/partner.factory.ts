import { CreatePartnerController } from '../../controllers/partners/create-partner-controller.ts'
import { DeletePartnerController } from '../../controllers/partners/delete-partner-controller.ts'
import { FindPartnerByIdController } from '../../controllers/partners/find-partner-by-id-controller.ts'
import { FindPartnersController } from '../../controllers/partners/find-partners-controller.ts'
import { UpdatePartnerController } from '../../controllers/partners/update-partner-controller.ts'
import { makePartnerRepository } from '../repositories/partner.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreatePartnerController() {
  return {
    createPartnerController: new CreatePartnerController(
      makePartnerRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindPartnersController() {
  return {
    findPartnersController: new FindPartnersController(makePartnerRepository()),
  }
}

export function makeFindPartnerByIdController() {
  return {
    findPartnerByIdController: new FindPartnerByIdController(
      makePartnerRepository(),
    ),
  }
}

export function makeUpdatePartnerController() {
  return {
    updatePartnerController: new UpdatePartnerController(
      makePartnerRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeletePartnerController() {
  return {
    deletePartnerController: new DeletePartnerController(
      makePartnerRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
