import { CreateResearcherController } from '../../controllers/researchers/create-researcher-controller.ts'
import { FindResearcherByIdController } from '../../controllers/researchers/find-researcher-by-id-controller.ts'
import { FindResearchersController } from '../../controllers/researchers/find-researchers-controller.ts'
import { makeResearcherRepository } from '../repositories/researcher.factory.ts'

export function makeCreateResearcherController() {
  return {
    createResearcherController: new CreateResearcherController(
      makeResearcherRepository()
    ),
  }
}

export function makeFindResearchersController() {
  return {
    findResearchersController: new FindResearchersController(
      makeResearcherRepository()
    ),
  }
}

export function makeFindResearcherByIdController() {
  return {
    findResearcherByIdController: new FindResearcherByIdController(
      makeResearcherRepository()
    ),
  }
}
