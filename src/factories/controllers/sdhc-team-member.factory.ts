import { CreateSDHCTeamMemberController } from '../../controllers/sdhc-team-member/create-sdhc-team-member-controller.ts'
import { makeSDHCTeamMemberRepository } from '../repositories/sdhc-team-member.factory.ts'

export function makeCreateSDHCTeamMemberController() {
  return {
    createSDHCTeamMemberController: new CreateSDHCTeamMemberController(
      makeSDHCTeamMemberRepository()
    ),
  }
}
