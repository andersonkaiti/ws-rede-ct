import type { ScientificJournal } from '../../../config/database/generated/client.ts'
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
  deleteById(id: string): Promise<void>
  count(data: ICountScientificJournalsDTO): Promise<number>
}
