import { prisma } from '../../../config/database/index.ts'
import { MuseumRepository } from '../../repositories/museum/museum-repository.ts'

export function makeMuseumRepository() {
  return new MuseumRepository(prisma)
}
