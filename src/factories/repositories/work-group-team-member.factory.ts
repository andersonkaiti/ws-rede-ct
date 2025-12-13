import { prisma } from '../../../config/database/index.ts'
import { WorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/work-group-team-member-repository.ts'

export function makeWorkGroupTeamMemberRepository() {
  return new WorkGroupTeamMemberRepository(prisma)
}
