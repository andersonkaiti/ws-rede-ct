import type { PrismaClient } from '@prisma/client'
import type { ICreateResearcherDTO } from '../../dto/researcher.d.ts'
import type { IResearcherRepository } from './iresearcher-repository.d.ts'

export class ResearcherRepository implements IResearcherRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(researcher: ICreateResearcherDTO) {
    return await this.prisma.researcher.create({
      data: researcher,
    })
  }

  async findByUserId(userId: string) {
    return await this.prisma.researcher.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }

  async findByRegistrationNumber(registrationNumber: string) {
    return await this.prisma.researcher.findFirst({
      where: {
        registrationNumber,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }
}
