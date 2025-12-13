import { prisma } from '../../../config/database/index.ts'
import { CertificationRepository } from '../../repositories/certification/certification-repository.ts'

export function makeCertificationRepository() {
  return new CertificationRepository(prisma)
}
