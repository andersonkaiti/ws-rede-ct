import type { RegionalCongressGalleryItem } from '../../config/database/generated/client.ts'

export interface ICreateRegionalCongressGalleryDTO {
  imageUrl: string
  caption?: string
  congressId: string
}

export interface IFindAllRegionalCongressGalleryByCongressIdDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    caption?: string
    congressId: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateRegionalCongressGalleryDTO
  extends Partial<
    Omit<RegionalCongressGalleryItem, 'createdAt' | 'updatedAt'>
  > {
  id: string
}

export interface ICountRegionalCongressGalleryDTO {
  filter: {
    caption?: string
    congressId: string
  }
}
