import { CreateETPController } from '../../controllers/etps/create-etp-controller.ts'
import { makeETPRepository } from '../repositories/etp.factory.ts'

export function makeCreateETPController() {
  return {
    createETPController: new CreateETPController(makeETPRepository()),
  }
}
