import { prisma } from '../../../config/database/index.ts'
import { LegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/legitimator-committee-member-repository.ts'

export function makeLegitimatorCommitteeMemberRepository() {
  return new LegitimatorCommitteeMemberRepository(prisma)
}
