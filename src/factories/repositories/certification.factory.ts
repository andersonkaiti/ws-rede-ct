import { prisma } from '../../../config/database.ts'
import { CertificationRepository } from '../../repositories/certification/certification-repository.ts'

export function makeCertificationRepository() {
  return new CertificationRepository(prisma)
}
