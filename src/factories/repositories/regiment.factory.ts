import { prisma } from '../../../config/database.ts'
import { RegimentRepository } from '../../repositories/regiment/regiment-repository.ts'

export function makeRegimentRepository() {
  return new RegimentRepository(prisma)
}

