import { prisma } from '../../../config/database/index.ts'
import { LawRepository } from '../../repositories/law/law-repository.ts'

export function makeLawRepository() {
  return new LawRepository(prisma)
}
