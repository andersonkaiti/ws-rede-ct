import { CreateReferenceCenterTeamMemberController } from '../../controllers/reference-center-team-member/create-reference-center-team-member-controller.ts'
import { makeReferenceCenterTeamMemberRepository } from '../repositories/reference-center-team-member.factory.ts'

export function makeCreateReferenceCenterTeamMemberController() {
  return {
    createReferenceCenterTeamMemberController:
      new CreateReferenceCenterTeamMemberController(
        makeReferenceCenterTeamMemberRepository()
      ),
  }
}
