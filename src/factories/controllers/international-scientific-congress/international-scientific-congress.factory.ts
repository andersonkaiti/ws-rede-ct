import { CreateInternationalScientificCongressController } from '../../../controllers/international-scientific-congress/create-international-scientific-congress-controller.ts'
import { DeleteInternationalScientificCongressController } from '../../../controllers/international-scientific-congress/delete-international-scientific-congress-controller.ts'
import { FindInternationalScientificCongressByEditionController } from '../../../controllers/international-scientific-congress/find-international-scientific-congress-by-edition-controller.ts'
import { FindInternationalScientificCongressByIdController } from '../../../controllers/international-scientific-congress/find-international-scientific-congress-by-id-controller.ts'
import { FindInternationalScientificCongressesController } from '../../../controllers/international-scientific-congress/find-international-scientific-congresses-controller.ts'
import { UpdateInternationalScientificCongressController } from '../../../controllers/international-scientific-congress/update-international-scientific-congress-controller.ts'
import { makeInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/international-scientific-congress.factory.ts'

export function makeCreateInternationalScientificCongressController() {
  return {
    createInternationalScientificCongressController:
      new CreateInternationalScientificCongressController(
        makeInternationalScientificCongressRepository()
      ),
  }
}

export function makeFindInternationalScientificCongressesController() {
  return {
    findInternationalScientificCongressesController:
      new FindInternationalScientificCongressesController(
        makeInternationalScientificCongressRepository()
      ),
  }
}

export function makeFindInternationalScientificCongressByIdController() {
  return {
    findInternationalScientificCongressByIdController:
      new FindInternationalScientificCongressByIdController(
        makeInternationalScientificCongressRepository()
      ),
  }
}

export function makeFindInternationalScientificCongressByEditionController() {
  return {
    findInternationalScientificCongressByEditionController:
      new FindInternationalScientificCongressByEditionController(
        makeInternationalScientificCongressRepository()
      ),
  }
}

export function makeUpdateInternationalScientificCongressController() {
  return {
    updateInternationalScientificCongressController:
      new UpdateInternationalScientificCongressController(
        makeInternationalScientificCongressRepository()
      ),
  }
}

export function makeDeleteInternationalScientificCongressController() {
  return {
    deleteInternationalScientificCongressController:
      new DeleteInternationalScientificCongressController(
        makeInternationalScientificCongressRepository()
      ),
  }
}
