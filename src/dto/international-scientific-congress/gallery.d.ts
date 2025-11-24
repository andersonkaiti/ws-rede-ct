import type { InternationalScientificCongressGallery } from '@prisma/client'

export interface ICreateCongressGalleryDTO {
  imageUrl: string
  caption?: string
  congressId: string
}

export interface IFindAllGalleryByCongressIdDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    caption?: string
    congressId: string
  }
}

export interface IUpdateCongressGalleryDTO
  extends Partial<
    Omit<InternationalScientificCongressGallery, 'createdAt' | 'updatedAt'>
  > {
  id: string
}

export interface ICountCongressGalleryDTO {
  filter: {
    caption?: string
    congressId: string
  }
}
