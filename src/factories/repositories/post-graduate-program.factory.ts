import { prisma } from '../../../config/database/index.ts'
import { PostGraduateProgramRepository } from '../../repositories/post-graduate-program/post-graduate-program-repository.ts'

export function makePostGraduateProgramRepository() {
  return new PostGraduateProgramRepository(prisma)
}
