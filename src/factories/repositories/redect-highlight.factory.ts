import { prisma } from '../../../config/database/index.ts'
import { RedeCTHighlightRepository } from '../../repositories/redect-highlight/redect-highlight-repository.ts'

export function makeRedeCTHighlightRepository() {
  return new RedeCTHighlightRepository(prisma)
}
