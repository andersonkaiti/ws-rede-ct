import { CreateScientificJournalController } from '../../controllers/scientific-journals/create-scientific-journal-controller.ts'
import { makeScientificJournalRepository } from '../repositories/scientific-journal.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateScientificJournalController() {
  return {
    createScientificJournalController: new CreateScientificJournalController(
      makeScientificJournalRepository(),
      makeFirebaseStorageService()
    ),
  }
}
