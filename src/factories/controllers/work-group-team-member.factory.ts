import { CreateWorkGroupTeamMemberController } from '../../controllers/work-group-team-member/create-work-group-team-member-controller.ts'
import { DeleteWorkGroupTeamMemberController } from '../../controllers/work-group-team-member/delete-work-group-team-member-controller.ts'
import { FindWorkGroupTeamMemberByIdController } from '../../controllers/work-group-team-member/find-work-group-team-member-by-id-controller.ts'
import { FindWorkGroupTeamMembersController } from '../../controllers/work-group-team-member/find-work-group-team-members-controller.ts'
import { UpdateWorkGroupTeamMemberController } from '../../controllers/work-group-team-member/update-work-group-team-member-controller.ts'
import { makeWorkGroupTeamMemberRepository } from '../repositories/work-group-team-member.factory.ts'

export function makeCreateWorkGroupTeamMemberController() {
  return {
    createWorkGroupTeamMemberController:
      new CreateWorkGroupTeamMemberController(
        makeWorkGroupTeamMemberRepository()
      ),
  }
}

export function makeFindWorkGroupTeamMembersController() {
  return {
    findWorkGroupTeamMembersController: new FindWorkGroupTeamMembersController(
      makeWorkGroupTeamMemberRepository()
    ),
  }
}

export function makeFindWorkGroupTeamMemberByIdController() {
  return {
    findWorkGroupTeamMemberByIdController:
      new FindWorkGroupTeamMemberByIdController(
        makeWorkGroupTeamMemberRepository()
      ),
  }
}

export function makeUpdateWorkGroupTeamMemberController() {
  return {
    updateWorkGroupTeamMemberController:
      new UpdateWorkGroupTeamMemberController(
        makeWorkGroupTeamMemberRepository()
      ),
  }
}

export function makeDeleteWorkGroupTeamMemberController() {
  return {
    deleteWorkGroupTeamMemberController:
      new DeleteWorkGroupTeamMemberController(
        makeWorkGroupTeamMemberRepository()
      ),
  }
}
