import { prisma } from '../../../config/database.ts'
import { ResearchGroupRepository } from '../../repositories/research-group/research-group-repository.ts'

export function makeResearchGroupRepository() {
  return new ResearchGroupRepository(prisma)
}
