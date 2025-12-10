import { CreateLawController } from '../../controllers/law/create-law-controller.ts'
import { makeLawRepository } from '../repositories/law.factory.ts'

export function makeCreateLawController() {
  return {
    createLawController: new CreateLawController(makeLawRepository()),
  }
}
