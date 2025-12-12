import { prisma } from '../../../config/database/index.ts'
import { ReferenceCenterTeamMemberRepository } from '../../repositories/reference-center-team-member/reference-center-team-member-repository.ts'

export function makeReferenceCenterTeamMemberRepository() {
  return new ReferenceCenterTeamMemberRepository(prisma)
}
