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
    await this.prisma.researcher.create({
      data: researcher,
    })
  }

  async update(researcher: IUpdateResearcherDTO) {
    await this.prisma.researcher.update({
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
    pagination,
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
    const where: Prisma.ResearcherWhereInput = {}

    const or: Prisma.ResearcherWhereInput[] = []

    if (userName) {
      or.push({
        user: {
          name: {
            contains: userName,
            mode: 'insensitive',
          },
        },
      })
    }

    if (registrationNumber) {
      or.push({
        registrationNumber: {
          contains: registrationNumber,
          mode: 'insensitive',
        },
      })
    }

    if (mainEtps) {
      or.push({
        mainEtps: {
          contains: mainEtps,
          mode: 'insensitive',
        },
      })
    }

    if (formations) {
      or.push({
        formations: {
          contains: formations,
          mode: 'insensitive',
        },
      })
    }

    if (occupations) {
      or.push({
        occupations: {
          contains: occupations,
          mode: 'insensitive',
        },
      })
    }

    if (institutions) {
      or.push({
        institutions: {
          contains: institutions,
          mode: 'insensitive',
        },
      })
    }

    if (biography) {
      or.push({
        biography: {
          contains: biography,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    if (degrees && degrees.length > 0) {
      where.degrees = {
        hasSome: degrees,
      }
    }

    if (seniority) {
      where.seniority = seniority
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
      orderBy: {
        updatedAt: orderBy,
      },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
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
    const where: Prisma.ResearcherWhereInput = {}

    const or: Prisma.ResearcherWhereInput[] = []

    if (userName) {
      or.push({
        user: {
          name: {
            contains: userName,
            mode: 'insensitive',
          },
        },
      })
    }

    if (registrationNumber) {
      or.push({
        registrationNumber: {
          contains: registrationNumber,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
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

    return await this.prisma.researcher.count({
      where,
    })
  }
}
