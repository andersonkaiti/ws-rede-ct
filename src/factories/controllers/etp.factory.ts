import { CreateETPController } from '../../controllers/etps/create-etp-controller.ts'
import { FindETPsController } from '../../controllers/etps/find-etps-controller.ts'
import { makeETPRepository } from '../repositories/etp.factory.ts'

export function makeCreateETPController() {
  return {
    createETPController: new CreateETPController(makeETPRepository()),
  }
}

export function makeFindETPsController() {
  return {
    findETPsController: new FindETPsController(makeETPRepository()),
  }
}
