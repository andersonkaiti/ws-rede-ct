export interface ICreateWebinarDTO {
  title: string
  description?: string
  scheduledAt: Date
  webinarLink?: string
  thumbnailUrl?: string
  guestIds?: string[]
}

export interface IUpdateWebinarDTO
  extends Partial<Omit<Webinar, 'createdAt' | 'updatedAt'>> {
  id: string
}
