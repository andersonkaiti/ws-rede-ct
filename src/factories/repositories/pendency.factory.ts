import { prisma } from '../../../config/database/index.ts'
import { PendencyRepository } from '../../repositories/pendency/pendency-repository.ts'

export function makePendencyRepository() {
  return new PendencyRepository(prisma)
}
