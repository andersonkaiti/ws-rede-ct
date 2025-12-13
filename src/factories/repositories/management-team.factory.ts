import { prisma } from '../../../config/database/index.ts'
import { ManagementTeamRepository } from '../../repositories/management-team/management-team-repository.ts'

export function makeManagementTeamRepository() {
  return new ManagementTeamRepository(prisma)
}
