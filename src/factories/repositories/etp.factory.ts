import { prisma } from '../../../config/database.ts'
import { ETPRepository } from '../../repositories/etp/etp-repository.ts'

export function makeETPRepository() {
  return new ETPRepository(prisma)
}
