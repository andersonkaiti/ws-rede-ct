import type { InternationalScientificCongress } from '../../config/database/generated/client.ts'

export interface ICreateInternationalScientificCongressDTO {
  title: string
  edition: number
  startDate: Date
  endDate: Date
  description?: string
  location?: string
  congressLink?: string
  noticeUrl?: string
  scheduleUrl?: string
  programUrl?: string
  adminReportUrl?: string
  proceedingsUrl?: string
}

export interface IFindAllInternationalScientificCongressDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    edition?: number
    location?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateInternationalScientificCongressDTO
  extends Partial<
    Omit<
      InternationalScientificCongress,
      'createdAt' | 'updatedAt' | 'partners' | 'galleries'
    >
  > {
  id: string
}

export interface ICountInternationalScientificCongressDTO {
  filter: {
    title?: string
    edition?: number
    location?: string
  }
}
