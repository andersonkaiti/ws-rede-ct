import { CreateLegitimatorCommitteeMemberController } from '../../controllers/legitimator-committee-member/create-legitimator-committee-member-controller.ts'
import { FindLegitimatorCommitteeMembersController } from '../../controllers/legitimator-committee-member/find-legitimator-committee-members-controller.ts'
import { makeLegitimatorCommitteeMemberRepository } from '../repositories/legitimator-committee-member.factory.ts'

export function makeCreateLegitimatorCommitteeMemberController() {
  return {
    createLegitimatorCommitteeMemberController:
      new CreateLegitimatorCommitteeMemberController(
        makeLegitimatorCommitteeMemberRepository()
      ),
  }
}

export function makeFindLegitimatorCommitteeMembersController() {
  return {
    findLegitimatorCommitteeMembersController:
      new FindLegitimatorCommitteeMembersController(
        makeLegitimatorCommitteeMemberRepository()
      ),
  }
}
