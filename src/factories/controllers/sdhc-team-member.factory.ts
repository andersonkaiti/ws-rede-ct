import { CreateSDHCTeamMemberController } from '../../controllers/sdhc-team-member/create-sdhc-team-member-controller.ts'
import { FindSDHCTeamMemberByIdController } from '../../controllers/sdhc-team-member/find-sdhc-team-member-by-id-controller.ts'
import { FindSDHCTeamMembersController } from '../../controllers/sdhc-team-member/find-sdhc-team-members-controller.ts'
import { UpdateSDHCTeamMemberController } from '../../controllers/sdhc-team-member/update-sdhc-team-member-controller.ts'
import { makeSDHCTeamMemberRepository } from '../repositories/sdhc-team-member.factory.ts'

export function makeCreateSDHCTeamMemberController() {
  return {
    createSDHCTeamMemberController: new CreateSDHCTeamMemberController(
      makeSDHCTeamMemberRepository()
    ),
  }
}

export function makeFindSDHCTeamMembersController() {
  return {
    findSDHCTeamMembersController: new FindSDHCTeamMembersController(
      makeSDHCTeamMemberRepository()
    ),
  }
}

export function makeFindSDHCTeamMemberByIdController() {
  return {
    findSDHCTeamMemberByIdController: new FindSDHCTeamMemberByIdController(
      makeSDHCTeamMemberRepository()
    ),
  }
}

export function makeUpdateSDHCTeamMemberController() {
  return {
    updateSDHCTeamMemberController: new UpdateSDHCTeamMemberController(
      makeSDHCTeamMemberRepository()
    ),
  }
}
