import { prisma } from '../../../config/database/index.ts'
import { ScientificJournalRepository } from '../../repositories/scientific-journal/scientific-journal-repository.ts'

export function makeScientificJournalRepository() {
  return new ScientificJournalRepository(prisma)
}
