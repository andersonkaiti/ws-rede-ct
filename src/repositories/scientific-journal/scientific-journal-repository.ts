import type { Prisma, PrismaClient, ScientificJournal } from '@prisma/client'
import type {
  ICountScientificJournalsDTO,
  ICreateScientificJournalDTO,
  IFindScientificJournalsDTO,
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

  async find({
    pagination: { offset, limit },
    filter: { name, description, issn, directors, editorialBoard, orderBy },
  }: IFindScientificJournalsDTO): Promise<ScientificJournal[]> {
    const where: Prisma.ScientificJournalWhereInput = {}

    const or: Prisma.ScientificJournalWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (issn) {
      or.push({
        issn: {
          contains: issn,
          mode: 'insensitive',
        },
      })
    }

    if (directors) {
      or.push({
        directors: {
          contains: directors,
          mode: 'insensitive',
        },
      })
    }

    if (editorialBoard) {
      or.push({
        editorialBoard: {
          contains: editorialBoard,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.scientificJournal.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<ScientificJournal | null> {
    return await this.prisma.scientificJournal.findFirst({
      where: {
        id,
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

  async deleteById(id: string): Promise<void> {
    await this.prisma.scientificJournal.delete({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { name, description, issn, directors, editorialBoard },
  }: ICountScientificJournalsDTO): Promise<number> {
    const where: Prisma.ScientificJournalWhereInput = {}

    const or: Prisma.ScientificJournalWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (issn) {
      or.push({
        issn: {
          contains: issn,
          mode: 'insensitive',
        },
      })
    }

    if (directors) {
      or.push({
        directors: {
          contains: directors,
          mode: 'insensitive',
        },
      })
    }

    if (editorialBoard) {
      or.push({
        editorialBoard: {
          contains: editorialBoard,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.scientificJournal.count({
      where,
    })
  }
}
