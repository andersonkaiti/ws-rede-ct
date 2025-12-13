import { prisma } from '../../../config/database/index.ts'
import { WebinarRepository } from '../../repositories/webinar/webinar-repository.ts'

export function makeWebinarRepository() {
  return new WebinarRepository(prisma)
}
