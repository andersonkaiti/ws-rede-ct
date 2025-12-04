export interface ICreateBookVolumeDTO {
  volumeNumber: number
  year: number
  title: string
  author: string
  accessUrl?: string
  authorImageUrl?: string
  coverImageUrl?: string
  catalogSheetUrl?: string
  description?: string
}

export interface IUpdateBookVolumeDTO
  extends Partial<Omit<BookVolume, 'createdAt' | 'updatedAt'>> {
  id: string
}
