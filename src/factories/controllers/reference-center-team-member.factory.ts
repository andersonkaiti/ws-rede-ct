import { CreateReferenceCenterTeamMemberController } from '../../controllers/reference-center-team-member/create-reference-center-team-member-controller.ts'
import { DeleteReferenceCenterTeamMemberController } from '../../controllers/reference-center-team-member/delete-reference-center-team-member-controller.ts'
import { FindReferenceCenterTeamMemberByIdController } from '../../controllers/reference-center-team-member/find-reference-center-team-member-by-id-controller.ts'
import { FindReferenceCenterTeamMembersController } from '../../controllers/reference-center-team-member/find-reference-center-team-members-controller.ts'
import { UpdateReferenceCenterTeamMemberController } from '../../controllers/reference-center-team-member/update-reference-center-team-member-controller.ts'
import { makeReferenceCenterTeamMemberRepository } from '../repositories/reference-center-team-member.factory.ts'

export function makeCreateReferenceCenterTeamMemberController() {
  return {
    createReferenceCenterTeamMemberController:
      new CreateReferenceCenterTeamMemberController(
        makeReferenceCenterTeamMemberRepository(),
      ),
  }
}

export function makeFindReferenceCenterTeamMembersController() {
  return {
    findReferenceCenterTeamMembersController:
      new FindReferenceCenterTeamMembersController(
        makeReferenceCenterTeamMemberRepository(),
      ),
  }
}

export function makeFindReferenceCenterTeamMemberByIdController() {
  return {
    findReferenceCenterTeamMemberByIdController:
      new FindReferenceCenterTeamMemberByIdController(
        makeReferenceCenterTeamMemberRepository(),
      ),
  }
}

export function makeUpdateReferenceCenterTeamMemberController() {
  return {
    updateReferenceCenterTeamMemberController:
      new UpdateReferenceCenterTeamMemberController(
        makeReferenceCenterTeamMemberRepository(),
      ),
  }
}

export function makeDeleteReferenceCenterTeamMemberController() {
  return {
    deleteReferenceCenterTeamMemberController:
      new DeleteReferenceCenterTeamMemberController(
        makeReferenceCenterTeamMemberRepository(),
      ),
  }
}
