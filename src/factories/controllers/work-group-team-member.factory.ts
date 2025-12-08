import { CreateWorkGroupTeamMemberController } from '../../controllers/work-group-team-member/create-work-group-team-member-controller.ts'
import { FindWorkGroupTeamMembersController } from '../../controllers/work-group-team-member/find-work-group-team-members-controller.ts'
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
