import { CreateRegionalCongressPartnerController } from '../../../controllers/regional-congress-partner/create-regional-congress-partner-controller.ts'
import { makeRegionalCongressRepository } from '../../repositories/regional-congress/regional-congress.factory.ts'
import { makeRegionalCongressPartnerRepository } from '../../repositories/regional-congress/regional-congress-partner.factory.ts'
import { makeFirebaseStorageService } from '../../services/firebase-storage.factory.ts'

export function makeCreateRegionalCongressPartnerController() {
  return {
    createRegionalCongressPartnerController:
      new CreateRegionalCongressPartnerController(
        makeRegionalCongressPartnerRepository(),
        makeRegionalCongressRepository(),
        makeFirebaseStorageService()
      ),
  }
}
