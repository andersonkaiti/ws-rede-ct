import { prisma } from '../../../config/database/index.ts'
import { ResearcherRepository } from '../../repositories/researcher/researcher-repository.ts'

export function makeResearcherRepository() {
  return new ResearcherRepository(prisma)
}
