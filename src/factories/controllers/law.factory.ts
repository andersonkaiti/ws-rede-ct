import { CreateLawController } from '../../controllers/law/create-law-controller.ts'
import { FindLawByIdController } from '../../controllers/law/find-law-by-id-controller.ts'
import { FindLawsController } from '../../controllers/law/find-laws-controller.ts'
import { UpdateLawController } from '../../controllers/law/update-law-controller.ts'
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

export function makeFindLawByIdController() {
  return {
    findLawByIdController: new FindLawByIdController(makeLawRepository()),
  }
}

export function makeUpdateLawController() {
  return {
    updateLawController: new UpdateLawController(makeLawRepository()),
  }
}
