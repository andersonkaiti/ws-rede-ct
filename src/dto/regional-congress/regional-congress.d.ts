import type { RegionalCongress } from '../../config/database/generated/client.ts'

export interface ICreateRegionalCongressDTO {
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

export interface IFindAllRegionalCongressDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    title?: string
    edition?: number
    location?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateRegionalCongressDTO
  extends Partial<
    Omit<RegionalCongress, 'createdAt' | 'updatedAt' | 'partners' | 'galleries'>
  > {
  id: string
}

export interface ICountRegionalCongressDTO {
  filter: {
    title?: string
    edition?: number
    location?: string
  }
}
