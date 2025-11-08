import type { Regiment, RegimentStatus } from '@prisma/client'

export interface ICreateRegimentDTO {
  title: string
  version: string
  publishedAt: Date
  documentUrl: string
  status?: RegimentStatus
}

export interface IUpdateRegimentDTO
  extends Partial<Omit<Regiment, 'createdAt' | 'updatedAt'>> {
  id: string
}
