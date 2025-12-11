import { CreateRedeCTHighlightController } from '../../controllers/redect-highlights/create-redect-highlight-controller.ts'
import { makeRedeCTHighlightRepository } from '../repositories/redect-highlight.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateRedeCTHighlightController() {
  return {
    createRedeCTHighlightController: new CreateRedeCTHighlightController(
      makeRedeCTHighlightRepository(),
      makeFirebaseStorageService()
    ),
  }
}
