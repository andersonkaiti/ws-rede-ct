import { CreateManagementTeamController } from '../../controllers/management-team/create-management-team-controller.ts'
import { makeManagementTeamRepository } from '../repositories/management-team.factory.ts'

export function makeCreateManagementTeamController() {
  return {
    createManagementTeamController: new CreateManagementTeamController(
      makeManagementTeamRepository()
    ),
  }
}
