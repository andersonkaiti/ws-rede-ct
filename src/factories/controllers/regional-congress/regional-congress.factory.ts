import { CreateRegionalCongressController } from '../../../controllers/regional-congress/create-regional-congress-controller.ts'
import { FindRegionalCongressByEditionController } from '../../../controllers/regional-congress/find-regional-congress-by-edition-controller.ts'
import { FindRegionalCongressByIdController } from '../../../controllers/regional-congress/find-regional-congress-by-id-controller.ts'
import { FindRegionalCongressesController } from '../../../controllers/regional-congress/find-regional-congresses-controller.ts'
import { UpdateRegionalCongressController } from '../../../controllers/regional-congress/update-regional-congress-controller.ts'
import { makeRegionalCongressRepository } from '../../repositories/regional-congress/regional-congress.factory.ts'

export function makeCreateRegionalCongressController() {
  return {
    createRegionalCongressController: new CreateRegionalCongressController(
      makeRegionalCongressRepository()
    ),
  }
}

export function makeFindRegionalCongressesController() {
  return {
    findRegionalCongressesController: new FindRegionalCongressesController(
      makeRegionalCongressRepository()
    ),
  }
}

export function makeFindRegionalCongressByIdController() {
  return {
    findRegionalCongressByIdController: new FindRegionalCongressByIdController(
      makeRegionalCongressRepository()
    ),
  }
}

export function makeFindRegionalCongressByEditionController() {
  return {
    findRegionalCongressByEditionController:
      new FindRegionalCongressByEditionController(
        makeRegionalCongressRepository()
      ),
  }
}

export function makeUpdateRegionalCongressController() {
  return {
    updateRegionalCongressController: new UpdateRegionalCongressController(
      makeRegionalCongressRepository()
    ),
  }
}
