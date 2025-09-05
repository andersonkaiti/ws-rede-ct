import { prisma } from '../../../config/database.ts'
import { TeamRepository } from '../../repositories/team/team-repository.ts'

export function makeTeamRepository() {
  return new TeamRepository(prisma)
}
