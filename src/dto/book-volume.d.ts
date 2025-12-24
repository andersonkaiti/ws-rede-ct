import type { BookVolume } from '../../config/database/generated/client.ts'

export interface ICreateBookVolumeDTO {
  volumeNumber: number
  year: number
  title: string
  authorId: string
  accessUrl?: string
  coverImageUrl?: string
  catalogSheetUrl?: string
  description?: string
}

export interface IFindBookVolumesDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    title?: string
    author?: string
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateBookVolumeDTO
  extends Partial<Omit<BookVolume, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountBookVolumesDTO {
  filter: {
    title?: string
    author?: string
    description?: string
  }
}
