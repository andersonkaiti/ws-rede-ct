import type { InternationalScientificCongressGallery } from '@prisma/client'

export interface ICreateCongressGalleryDTO {
  imageUrl: string
  caption?: string
  congressId: string
}

export interface IUpdateCongressGalleryDTO
  extends Partial<
    Omit<InternationalScientificCongressGallery, 'createdAt' | 'updatedAt'>
  > {
  id: string
}
