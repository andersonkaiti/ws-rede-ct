import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountResearchersDTO,
  ICreateResearcherDTO,
  IFindAllResearchersDTO,
  IUpdateResearcherDTO,
} from '../../dto/researcher.d.ts'
import type { IResearcherRepository } from './iresearcher-repository.d.ts'

export class ResearcherRepository implements IResearcherRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(researcher: ICreateResearcherDTO) {
    return await this.prisma.researcher.create({
      data: researcher,
    })
  }

  async update(researcher: IUpdateResearcherDTO) {
    return await this.prisma.researcher.update({
      where: {
        id: researcher.id,
      },
      data: researcher,
    })
  }

  async deleteById(id: string) {
    await this.prisma.researcher.delete({
      where: { id },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: {
      biography,
      degrees,
      formations,
      institutions,
      mainEtps,
      occupations,
      orderBy,
      registrationNumber,
      seniority,
      userId,
      userName,
    },
  }: IFindAllResearchersDTO) {
    const where: Prisma.ResearcherWhereInput = {
      OR: userName
        ? [
            {
              user: {
                name: {
                  contains: userName,
                  mode: 'insensitive',
                },
              },
            },
          ]
        : undefined,
    }

    if (registrationNumber) {
      where.OR?.push({
        registrationNumber: {
          contains: registrationNumber,
          mode: 'insensitive',
        },
      })
    }

    if (mainEtps) {
      where.mainEtps = {
        contains: mainEtps,
        mode: 'insensitive',
      }
    }

    if (formations) {
      where.formations = {
        contains: formations,
        mode: 'insensitive',
      }
    }

    if (degrees && degrees.length > 0) {
      where.degrees = {
        hasSome: degrees,
      }
    }

    if (occupations) {
      where.occupations = {
        contains: occupations,
        mode: 'insensitive',
      }
    }

    if (seniority) {
      where.seniority = seniority
    }

    if (institutions) {
      where.institutions = {
        contains: institutions,
        mode: 'insensitive',
      }
    }

    if (biography) {
      where.biography = {
        contains: biography,
        mode: 'insensitive',
      }
    }

    if (userId) {
      where.userId = {
        equals: userId,
      }
    }

    return await this.prisma.researcher.findMany({
      where,
      omit: {
        userId: true,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      orderBy: orderBy ? { updatedAt: orderBy } : { updatedAt: 'desc' },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.researcher.findFirst({
      where: {
        id,
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

  async count({
    filter: {
      biography,
      degrees,
      formations,
      institutions,
      mainEtps,
      occupations,
      registrationNumber,
      seniority,
      userId,
      userName,
    },
  }: ICountResearchersDTO) {
    const researcherWhere: Prisma.ResearcherWhereInput = {
      OR: userName
        ? [
            {
              user: {
                name: {
                  contains: userName,
                  mode: 'insensitive',
                },
              },
            },
          ]
        : undefined,
    }

    if (registrationNumber) {
      researcherWhere.OR?.push({
        registrationNumber: {
          contains: registrationNumber,
          mode: 'insensitive',
        },
      })
    }

    if (mainEtps) {
      researcherWhere.mainEtps = {
        contains: mainEtps,
        mode: 'insensitive',
      }
    }

    if (formations) {
      researcherWhere.formations = {
        contains: formations,
        mode: 'insensitive',
      }
    }

    if (degrees && degrees.length > 0) {
      researcherWhere.degrees = {
        hasSome: degrees,
      }
    }

    if (occupations) {
      researcherWhere.occupations = {
        contains: occupations,
        mode: 'insensitive',
      }
    }

    if (seniority) {
      researcherWhere.seniority = seniority
    }

    if (institutions) {
      researcherWhere.institutions = {
        contains: institutions,
        mode: 'insensitive',
      }
    }

    if (biography) {
      researcherWhere.biography = {
        contains: biography,
        mode: 'insensitive',
      }
    }

    if (userId) {
      researcherWhere.userId = {
        equals: userId,
      }
    }

    return await this.prisma.researcher.count({
      where: researcherWhere,
    })
  }
}
