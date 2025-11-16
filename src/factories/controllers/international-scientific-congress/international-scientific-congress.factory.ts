import { CreateInternationalScientificCongressController } from '../../../controllers/international-scientific-congress/create-international-scientific-congress-controller.ts'
import { makeInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/international-scientific-congress.factory.ts'

export function makeCreateInternationalScientificCongressController() {
  return {
    createInternationalScientificCongressController:
      new CreateInternationalScientificCongressController(
        makeInternationalScientificCongressRepository()
      ),
  }
}
