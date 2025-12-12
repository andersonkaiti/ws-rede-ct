import { prisma } from '../../../config/database/index.ts'
import { InMemoriamRepository } from '../../repositories/in-memoriam/in-memoriam-repository.ts'

export function makeInMemoriamRepository() {
  return new InMemoriamRepository(prisma)
}
