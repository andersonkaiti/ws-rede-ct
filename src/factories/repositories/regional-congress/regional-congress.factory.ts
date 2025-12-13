import { prisma } from '../../../../config/database/index.ts'
import { RegionalCongressRepository } from '../../../repositories/regional-congress/regional-congress-repository.ts'

export function makeRegionalCongressRepository() {
  return new RegionalCongressRepository(prisma)
}
