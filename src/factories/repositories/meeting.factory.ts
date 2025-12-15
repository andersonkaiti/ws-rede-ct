import { prisma } from '../../../config/database/index.ts'
import { MeetingRepository } from '../../repositories/meeting/meeting-repository.ts'

export function makeMeetingRepository() {
  return new MeetingRepository(prisma)
}
