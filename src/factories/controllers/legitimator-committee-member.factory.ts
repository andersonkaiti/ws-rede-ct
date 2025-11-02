import { CreateLegitimatorCommitteeMemberController } from '../../controllers/legitimator-committee-member/create-legitimator-committee-member-controller.ts'
import { makeLegitimatorCommitteeMemberRepository } from '../repositories/legitimator-committee-member.factory.ts'

export function makeCreateLegitimatorCommitteeMemberController() {
  return {
    createLegitimatorCommitteeMemberController:
      new CreateLegitimatorCommitteeMemberController(
        makeLegitimatorCommitteeMemberRepository()
      ),
  }
}
