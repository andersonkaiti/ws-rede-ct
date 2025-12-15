import { CreateManagementTeamController } from '../../controllers/management-team/create-management-team-controller.ts'
import { DeleteManagementTeamController } from '../../controllers/management-team/delete-management-team-controller.ts'
import { FindManagementTeamByIdController } from '../../controllers/management-team/find-management-team-by-id-controller.ts'
import { FindManagementTeamsController } from '../../controllers/management-team/find-management-teams-controller.ts'
import { UpdateManagementTeamController } from '../../controllers/management-team/update-management-team-controller.ts'
import { makeManagementTeamRepository } from '../repositories/management-team.factory.ts'

export function makeCreateManagementTeamController() {
  return {
    createManagementTeamController: new CreateManagementTeamController(
      makeManagementTeamRepository(),
    ),
  }
}

export function makeFindManagementTeamsController() {
  return {
    findManagementTeamsController: new FindManagementTeamsController(
      makeManagementTeamRepository(),
    ),
  }
}

export function makeFindManagementTeamByIdController() {
  return {
    findManagementTeamByIdController: new FindManagementTeamByIdController(
      makeManagementTeamRepository(),
    ),
  }
}

export function makeUpdateManagementTeamController() {
  return {
    updateManagementTeamController: new UpdateManagementTeamController(
      makeManagementTeamRepository(),
    ),
  }
}

export function makeDeleteManagementTeamController() {
  return {
    deleteManagementTeamController: new DeleteManagementTeamController(
      makeManagementTeamRepository(),
    ),
  }
}
