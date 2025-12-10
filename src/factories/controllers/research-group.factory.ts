import { CreateResearchGroupController } from '../../controllers/research-groups/create-research-group-controller.ts'
import { FindResearchGroupByIdController } from '../../controllers/research-groups/find-research-group-by-id-controller.ts'
import { FindResearchGroupsController } from '../../controllers/research-groups/find-research-groups-controller.ts'
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

export function makeFindResearchGroupsController() {
  return {
    findResearchGroupsController: new FindResearchGroupsController(
      makeResearchGroupRepository()
    ),
  }
}

export function makeFindResearchGroupByIdController() {
  return {
    findResearchGroupByIdController: new FindResearchGroupByIdController(
      makeResearchGroupRepository()
    ),
  }
}
