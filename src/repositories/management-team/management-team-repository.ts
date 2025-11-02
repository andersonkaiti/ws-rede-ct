import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountManagementTeamsDTO,
  ICreateManagementTeamDTO,
  IFindAllManagementTeamsDTO,
} from '../../dto/management-team.d.ts'
import type { IManagementTeamRepository } from './imanagement-team-repository.d.ts'

export class ManagementTeamRepository implements IManagementTeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(team: ICreateManagementTeamDTO) {
    const { members, ...teamData } = team

    await this.prisma.$transaction(async (tx) => {
      const createdTeam = await tx.managementTeam.create({
        data: teamData,
      })

      await tx.managementTeamMember.createMany({
        data: members.map(({ userId, role }) => ({
          teamId: createdTeam.id,
          userId,
          role,
        })),
      })

      return createdTeam
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { name, description, orderBy },
  }: IFindAllManagementTeamsDTO) {
    const where: Prisma.ManagementTeamWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      }
    }

    return await this.prisma.managementTeam.findMany({
      where,
      include: {
        members: {
          include: {
            user: {
              omit: {
                passwordHash: true,
              },
            },
          },
        },
      },
      orderBy: orderBy
        ? {
            updatedAt: orderBy,
          }
        : {
            updatedAt: 'desc',
          },
      skip: offset,
      take: limit,
    })
  }

  async findByName(name: string) {
    return await this.prisma.managementTeam.findFirst({
      where: {
        name,
      },
      include: {
        members: {
          include: {
            user: {
              omit: {
                passwordHash: true,
              },
            },
          },
        },
      },
    })
  }

  async count({ filter: { name, description } }: ICountManagementTeamsDTO) {
    const where: Prisma.ManagementTeamWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      }
    }

    return await this.prisma.managementTeam.count({
      where,
    })
  }
}
