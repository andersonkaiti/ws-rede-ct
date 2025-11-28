import { prisma } from '../../../../config/database.ts'
import { RegionalCongressPartnerRepository } from '../../../repositories/regional-congress/partner/regional-congress-partner-repository.ts'

export function makeRegionalCongressPartnerRepository() {
  return new RegionalCongressPartnerRepository(prisma)
}
