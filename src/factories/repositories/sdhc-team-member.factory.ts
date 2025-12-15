import { prisma } from '../../../config/database/index.ts'
import { SDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/sdhc-team-member-repository.ts'

export function makeSDHCTeamMemberRepository() {
  return new SDHCTeamMemberRepository(prisma)
}
