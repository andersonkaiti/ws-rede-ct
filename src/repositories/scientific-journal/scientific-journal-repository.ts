import type { PrismaClient, ScientificJournal } from '@prisma/client'
import type {
  ICreateScientificJournalDTO,
  IUpdateScientificJournalDTO,
} from '../../dto/scientific-journal.ts'
import type { IScientificJournalRepository } from './iscientific-journal-repository.ts'

export class ScientificJournalRepository
  implements IScientificJournalRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    name,
    issn,
    description,
    logoUrl,
    journalUrl,
    directors,
    editorialBoard,
  }: ICreateScientificJournalDTO): Promise<ScientificJournal> {
    return await this.prisma.scientificJournal.create({
      data: {
        name,
        issn,
        description,
        logoUrl,
        journalUrl,
        directors,
        editorialBoard,
      },
    })
  }

  async update({
    id,
    name,
    issn,
    description,
    logoUrl,
    journalUrl,
    directors,
    editorialBoard,
  }: IUpdateScientificJournalDTO): Promise<void> {
    await this.prisma.scientificJournal.update({
      where: {
        id,
      },
      data: {
        name,
        issn,
        description,
        logoUrl,
        journalUrl,
        directors,
        editorialBoard,
      },
    })
  }
}
