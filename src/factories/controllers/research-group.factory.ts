import { CreateResearchGroupController } from '../../controllers/research-groups/create-research-group-controller.ts'
import { DeleteResearchGroupController } from '../../controllers/research-groups/delete-research-group-controller.ts'
import { FindResearchGroupByIdController } from '../../controllers/research-groups/find-research-group-by-id-controller.ts'
import { FindResearchGroupsController } from '../../controllers/research-groups/find-research-groups-controller.ts'
import { UpdateResearchGroupController } from '../../controllers/research-groups/update-research-group-controller.ts'
import { makeResearchGroupRepository } from '../repositories/research-group.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateResearchGroupController() {
  return {
    createResearchGroupController: new CreateResearchGroupController(
      makeResearchGroupRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindResearchGroupsController() {
  return {
    findResearchGroupsController: new FindResearchGroupsController(
      makeResearchGroupRepository(),
    ),
  }
}

export function makeFindResearchGroupByIdController() {
  return {
    findResearchGroupByIdController: new FindResearchGroupByIdController(
      makeResearchGroupRepository(),
    ),
  }
}

export function makeUpdateResearchGroupController() {
  return {
    updateResearchGroupController: new UpdateResearchGroupController(
      makeResearchGroupRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeleteResearchGroupController() {
  return {
    deleteResearchGroupController: new DeleteResearchGroupController(
      makeResearchGroupRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
