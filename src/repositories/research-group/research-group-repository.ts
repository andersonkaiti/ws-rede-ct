import type { Prisma, PrismaClient, ResearchGroup } from '@prisma/client'
import type {
  ICountResearchGroupsDTO,
  ICreateResearchGroupDTO,
  IFindResearchGroupsDTO,
  IUpdateResearchGroupDTO,
} from '../../dto/research-group.ts'
import type {
  IResearchGroupRepository,
  ResearchGroupWithLeaders,
} from './iresearch-group-repository.ts'

export class ResearchGroupRepository implements IResearchGroupRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    name,
    acronym,
    description,
    url,
    logoUrl,
    foundedAt,
    scope,
    email,
    leaderId,
    deputyLeaderId,
  }: ICreateResearchGroupDTO): Promise<ResearchGroup> {
    return await this.prisma.researchGroup.create({
      data: {
        name,
        acronym,
        description,
        url,
        logoUrl,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { name, acronym, description, leader, orderBy },
  }: IFindResearchGroupsDTO): Promise<ResearchGroupWithLeaders[]> {
    const where: Prisma.ResearchGroupWhereInput = {}

    const or: Prisma.ResearchGroupWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (acronym) {
      or.push({
        acronym: {
          contains: acronym,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (leader) {
      or.push({
        leader: {
          name: {
            contains: leader,
            mode: 'insensitive',
          },
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.researchGroup.findMany({
      where,
      include: {
        leader: {
          omit: {
            passwordHash: true,
          },
        },
        deputyLeader: {
          omit: {
            passwordHash: true,
          },
        },
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<ResearchGroupWithLeaders | null> {
    return await this.prisma.researchGroup.findFirst({
      where: {
        id,
      },
      include: {
        leader: {
          omit: {
            passwordHash: true,
          },
        },
        deputyLeader: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }

  async update({
    id,
    name,
    acronym,
    description,
    url,
    logoUrl,
    foundedAt,
    scope,
    email,
    leaderId,
    deputyLeaderId,
  }: IUpdateResearchGroupDTO): Promise<void> {
    await this.prisma.researchGroup.update({
      where: {
        id,
      },
      data: {
        name,
        acronym,
        description,
        url,
        logoUrl,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      },
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.researchGroup.delete({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { name, acronym, description, leader },
  }: ICountResearchGroupsDTO): Promise<number> {
    const where: Prisma.ResearchGroupWhereInput = {}

    const or: Prisma.ResearchGroupWhereInput[] = []

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (acronym) {
      or.push({
        acronym: {
          contains: acronym,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (leader) {
      or.push({
        leader: {
          name: {
            contains: leader,
            mode: 'insensitive',
          },
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.researchGroup.count({
      where,
    })
  }
}
