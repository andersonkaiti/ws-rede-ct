import { prisma } from '../../../config/database.ts'
import { PostGraduateProgramRepository } from '../../repositories/post-graduate-program/post-graduate-program-repository.ts'

export function makePostGraduateProgramRepository() {
  return new PostGraduateProgramRepository(prisma)
}
