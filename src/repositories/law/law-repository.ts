import type { PrismaClient } from '@prisma/client'
import type { ICreateLawDTO } from '../../dto/law.d.ts'
import type { ILawRepository } from './ilaw-repository.d.ts'

export class LawRepository implements ILawRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(law: ICreateLawDTO) {
    await this.prisma.law.create({
      data: {
        ...law,
      },
    })
  }
}
