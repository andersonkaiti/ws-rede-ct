import { prisma } from '../../../config/database.ts'
import { NewsRepository } from '../../repositories/news/news-repository.ts'

export function makeNewsRepository() {
  return new NewsRepository(prisma)
}
