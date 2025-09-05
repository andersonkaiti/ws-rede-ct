import { prisma } from '../../../config/database.ts'
import { TeamMemberRepository } from '../../repositories/team-member/team-member-repository.ts'

export function makeTeamMemberRepository() {
  return new TeamMemberRepository(prisma)
}
