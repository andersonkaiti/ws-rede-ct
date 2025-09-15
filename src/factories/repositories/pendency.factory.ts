import { prisma } from '../../../config/database.ts'
import { PendencyRepository } from '../../repositories/pendency/pendency-repository.ts'

export function makePendencyRepository() {
  return new PendencyRepository(prisma)
}
