import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountManagementTeamsDTO,
  ICreateManagementTeamDTO,
  IFindAllManagementTeamsDTO,
  IUpdateManagementTeamDTO,
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

  async update(team: IUpdateManagementTeamDTO) {
    const { members, ...teamData } = team

    await this.prisma.$transaction(async (tx) => {
      const updatedTeam = await tx.managementTeam.update({
        where: {
          id: team.id,
        },
        data: teamData,
      })

      if (members !== undefined) {
        await tx.managementTeamMember.deleteMany({
          where: {
            teamId: team.id,
          },
        })

        if (members.length > 0) {
          await tx.managementTeamMember.createMany({
            data: members.map(({ userId, role }) => ({
              teamId: team.id,
              userId,
              role,
            })),
          })
        }
      }

      return updatedTeam
    })
  }

  async deleteById(id: string) {
    await this.prisma.managementTeam.delete({
      where: {
        id,
      },
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

  async findById(id: string) {
    return await this.prisma.managementTeam.findFirst({
      where: {
        id,
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
