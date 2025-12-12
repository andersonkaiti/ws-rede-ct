import { prisma } from '../../../../config/database/index.ts'
import { InternationalScientificCongressRepository } from '../../../repositories/international-scientific-congress/international-scientific-congress-repository.ts'

export function makeInternationalScientificCongressRepository() {
  return new InternationalScientificCongressRepository(prisma)
}
