import type { ScientificJournal } from '@prisma/client'
import type {
  ICountScientificJournalsDTO,
  ICreateScientificJournalDTO,
  IFindScientificJournalsDTO,
  IUpdateScientificJournalDTO,
} from '../../dto/scientific-journal.ts'

export interface IScientificJournalRepository {
  create(data: ICreateScientificJournalDTO): Promise<ScientificJournal>
  find(data: IFindScientificJournalsDTO): Promise<ScientificJournal[] | null>
  findById(id: string): Promise<ScientificJournal | null>
  update(data: IUpdateScientificJournalDTO): Promise<void>
  count(data: ICountScientificJournalsDTO): Promise<number>
}
