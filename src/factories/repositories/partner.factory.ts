import { prisma } from '../../../config/database.ts'
import { PartnerRepository } from '../../repositories/partner/partner-repository.ts'

export function makePartnerRepository() {
  return new PartnerRepository(prisma)
}
