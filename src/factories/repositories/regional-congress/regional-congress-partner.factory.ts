import { prisma } from '../../../../config/database/index.ts'
import { RegionalCongressPartnerRepository } from '../../../repositories/regional-congress/partner/regional-congress-partner-repository.ts'

export function makeRegionalCongressPartnerRepository() {
  return new RegionalCongressPartnerRepository(prisma)
}
