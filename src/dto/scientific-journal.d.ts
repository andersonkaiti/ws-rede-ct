export interface ICreateScientificJournalDTO {
  name: string
  issn: string
  description: string
  logoUrl?: string
  journalUrl: string
  directors?: string
  editorialBoard?: string
}

export interface IUpdateScientificJournalDTO
  extends Partial<Omit<ScientificJournal, 'createdAt' | 'updatedAt'>> {
  id: string
}
