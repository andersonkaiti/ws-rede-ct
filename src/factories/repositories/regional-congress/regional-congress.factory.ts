import { prisma } from '../../../../config/database.ts'
import { RegionalCongressRepository } from '../../../repositories/regional-congress/regional-congress-repository.ts'

export function makeRegionalCongressRepository() {
  return new RegionalCongressRepository(prisma)
}
