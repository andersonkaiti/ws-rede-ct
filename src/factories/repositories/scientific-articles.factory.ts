import { prisma } from '../../../config/database.ts'
import { ScientificArticlesRepository } from '../../repositories/scientific-articles/scientific-articles-repository.ts'

export function makeScientificArticlesRepository() {
  return new ScientificArticlesRepository(prisma)
}
