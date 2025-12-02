export interface ICreateScientificJournalDTO {
  name: string
  issn: string
  description: string
  logoUrl?: string
  journalUrl: string
  directors?: string
  editorialBoard?: string
}

export interface IFindScientificJournalsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    description?: string
    issn?: string
    directors?: string
    editorialBoard?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateScientificJournalDTO
  extends Partial<Omit<ScientificJournal, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountScientificJournalsDTO {
  filter: {
    name?: string
    description?: string
    issn?: string
    directors?: string
    editorialBoard?: string
  }
}
