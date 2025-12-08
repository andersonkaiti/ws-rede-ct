import { CreateWorkGroupTeamMemberController } from '../../controllers/work-group-team-member/create-work-group-team-member-controller.ts'
import { makeWorkGroupTeamMemberRepository } from '../repositories/work-group-team-member.factory.ts'

export function makeCreateWorkGroupTeamMemberController() {
  return {
    createWorkGroupTeamMemberController:
      new CreateWorkGroupTeamMemberController(
        makeWorkGroupTeamMemberRepository()
      ),
  }
}
