import { prisma } from '../../../../config/database.ts'
import { InternationalScientificCongressPartnerRepository } from '../../../repositories/international-scientific-congress/partner/international-scientific-congress-partner-repository.ts'

export function makeInternationalScientificCongressPartnerRepository() {
  return new InternationalScientificCongressPartnerRepository(prisma)
}
