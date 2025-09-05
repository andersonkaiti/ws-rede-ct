import { CreateTeamController } from '../../controllers/team/create-team-controller.ts'
import { DeleteTeamController } from '../../controllers/team/delete-team-controller.ts'
import { FindTeamByIdController } from '../../controllers/team/find-team-by-id-controller.ts'
import { FindTeamByTypeController } from '../../controllers/team/find-team-by-type-controller.ts'
import { FindTeamsController } from '../../controllers/team/find-teams-controller.ts'
import { UpdateTeamController } from '../../controllers/team/update-team-controller.ts'
import { makeTeamRepository } from '../repositories/team.factory.ts'
import { makeTeamMemberRepository } from '../repositories/team-member.factory.ts'

export function makeFindTeamsController() {
  return {
    findTeamsController: new FindTeamsController(makeTeamRepository()),
  }
}

export function makeFindTeamByIdController() {
  return {
    findTeamByIdController: new FindTeamByIdController(makeTeamRepository()),
  }
}

export function makeFindTeamByTypeController() {
  return {
    findTeamByTypeController: new FindTeamByTypeController(
      makeTeamRepository()
    ),
  }
}

export function makeCreateTeamController() {
  return {
    createTeamController: new CreateTeamController(makeTeamRepository()),
  }
}

export function makeUpdateTeamController() {
  return {
    updateTeamController: new UpdateTeamController(
      makeTeamRepository(),
      makeTeamMemberRepository()
    ),
  }
}

export function makeDeleteTeamController() {
  return {
    deleteTeamController: new DeleteTeamController(makeTeamRepository()),
  }
}
