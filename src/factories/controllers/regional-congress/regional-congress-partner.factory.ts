import { CreateRegionalCongressPartnerController } from '../../../controllers/regional-congress-partner/create-regional-congress-partner-controller.ts'
import { DeleteRegionalCongressPartnerController } from '../../../controllers/regional-congress-partner/delete-regional-congress-partner-controller.ts'
import { FindRegionalCongressPartnerByIdController } from '../../../controllers/regional-congress-partner/find-regional-congress-partner-by-id-controller.ts'
import { FindRegionalCongressPartnersByCongressIdController } from '../../../controllers/regional-congress-partner/find-regional-congress-partners-by-congress-id-controller.ts'
import { UpdateRegionalCongressPartnerController } from '../../../controllers/regional-congress-partner/update-regional-congress-partner-controller.ts'
import { makeRegionalCongressRepository } from '../../repositories/regional-congress/regional-congress.factory.ts'
import { makeRegionalCongressPartnerRepository } from '../../repositories/regional-congress/regional-congress-partner.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateRegionalCongressPartnerController() {
  return {
    createRegionalCongressPartnerController:
      new CreateRegionalCongressPartnerController(
        makeRegionalCongressPartnerRepository(),
        makeRegionalCongressRepository(),
        makeFirebaseStorageService(),
      ),
  }
}

export function makeFindRegionalCongressPartnersByCongressIdController() {
  return {
    findRegionalCongressPartnersByCongressIdController:
      new FindRegionalCongressPartnersByCongressIdController(
        makeRegionalCongressPartnerRepository(),
      ),
  }
}

export function makeFindRegionalCongressPartnerByIdController() {
  return {
    findRegionalCongressPartnerByIdController:
      new FindRegionalCongressPartnerByIdController(
        makeRegionalCongressPartnerRepository(),
      ),
  }
}

export function makeUpdateRegionalCongressPartnerController() {
  return {
    updateRegionalCongressPartnerController:
      new UpdateRegionalCongressPartnerController(
        makeRegionalCongressPartnerRepository(),
        makeFirebaseStorageService(),
      ),
  }
}

export function makeDeleteRegionalCongressPartnerController() {
  return {
    deleteRegionalCongressPartnerController:
      new DeleteRegionalCongressPartnerController(
        makeRegionalCongressPartnerRepository(),
      ),
  }
}
