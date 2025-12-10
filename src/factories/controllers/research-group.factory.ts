import { CreateResearchGroupController } from '../../controllers/research-groups/create-research-group-controller.ts'
import { makeResearchGroupRepository } from '../repositories/research-group.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateResearchGroupController() {
  return {
    createResearchGroupController: new CreateResearchGroupController(
      makeResearchGroupRepository(),
      makeFirebaseStorageService()
    ),
  }
}
