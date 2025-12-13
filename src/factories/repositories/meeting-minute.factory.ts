import { prisma } from '../../../config/database/index.ts'
import { MeetingMinuteRepository } from '../../repositories/meeting-minute/meeting-minute-repository.ts'

export function makeMeetingMinuteRepository() {
  return new MeetingMinuteRepository(prisma)
}

