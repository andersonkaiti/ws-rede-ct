import { CreateRegionalCongressController } from '../../../controllers/regional-congress/create-regional-congress-controller.ts'
import { FindRegionalCongressesController } from '../../../controllers/regional-congress/find-regional-congresses-controller.ts'
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
