import type { ScientificJournal } from '@prisma/client'
import type {
  ICreateScientificJournalDTO,
  IUpdateScientificJournalDTO,
} from '../../dto/scientific-journal.ts'

export interface IScientificJournalRepository {
  create(data: ICreateScientificJournalDTO): Promise<ScientificJournal>
  update(data: IUpdateScientificJournalDTO): Promise<void>
}
