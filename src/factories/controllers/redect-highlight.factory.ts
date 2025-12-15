import { CreateRedeCTHighlightController } from '../../controllers/redect-highlights/create-redect-highlight-controller.ts'
import { DeleteRedeCTHighlightController } from '../../controllers/redect-highlights/delete-redect-highlight-controller.ts'
import { FindRedeCTHighlightByIdController } from '../../controllers/redect-highlights/find-redect-highlight-by-id-controller.ts'
import { FindRedeCTHighlightsController } from '../../controllers/redect-highlights/find-redect-highlights-controller.ts'
import { UpdateRedeCTHighlightController } from '../../controllers/redect-highlights/update-redect-highlight-controller.ts'
import { makeRedeCTHighlightRepository } from '../repositories/redect-highlight.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateRedeCTHighlightController() {
  return {
    createRedeCTHighlightController: new CreateRedeCTHighlightController(
      makeRedeCTHighlightRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindRedeCTHighlightsController() {
  return {
    findRedeCTHighlightsController: new FindRedeCTHighlightsController(
      makeRedeCTHighlightRepository(),
    ),
  }
}

export function makeFindRedeCTHighlightByIdController() {
  return {
    findRedeCTHighlightByIdController: new FindRedeCTHighlightByIdController(
      makeRedeCTHighlightRepository(),
    ),
  }
}

export function makeUpdateRedeCTHighlightController() {
  return {
    updateRedeCTHighlightController: new UpdateRedeCTHighlightController(
      makeRedeCTHighlightRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeleteRedeCTHighlightController() {
  return {
    deleteRedeCTHighlightController: new DeleteRedeCTHighlightController(
      makeRedeCTHighlightRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
