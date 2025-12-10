import { CreateLawController } from '../../controllers/law/create-law-controller.ts'
import { FindLawsController } from '../../controllers/law/find-laws-controller.ts'
import { makeLawRepository } from '../repositories/law.factory.ts'

export function makeCreateLawController() {
  return {
    createLawController: new CreateLawController(makeLawRepository()),
  }
}

export function makeFindLawsController() {
  return {
    findLawsController: new FindLawsController(makeLawRepository()),
  }
}
