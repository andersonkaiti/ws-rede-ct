import { prisma } from '../../../config/database/index.ts'
import { EventRepository } from '../../repositories/event/event-repository.ts'

export function makeEventRepository() {
  return new EventRepository(prisma)
}
