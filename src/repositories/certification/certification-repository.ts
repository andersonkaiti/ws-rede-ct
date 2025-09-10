import type { PrismaClient } from '@prisma/client'
import type { IRegisterCertificationDTO } from '../../dto/certification.ts'
import type { ICertificationRepository } from './icertification-repository.ts'

export class CertificationRepository implements ICertificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async register({
    userId,
    title,
    description,
    certificationUrl,
  }: IRegisterCertificationDTO): Promise<void> {
    await this.prisma.certification.create({
      data: {
        title,
        description,
        certificationUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }
}
