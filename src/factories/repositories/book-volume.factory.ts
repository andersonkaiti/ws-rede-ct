import { prisma } from '../../../config/database/index.ts'
import { BookVolumeRepository } from '../../repositories/book-volume/book-volume-repository.ts'

export function makeBookVolumeRepository() {
  return new BookVolumeRepository(prisma)
}
