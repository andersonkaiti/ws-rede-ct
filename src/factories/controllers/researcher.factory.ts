import { CreateResearcherController } from '../../controllers/researchers/create-researcher-controller.ts'
import { makeResearcherRepository } from '../repositories/researcher.factory.ts'

export function makeCreateResearcherController() {
  return {
    createResearcherController: new CreateResearcherController(
      makeResearcherRepository()
    ),
  }
}
