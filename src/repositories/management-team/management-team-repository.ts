import type { PrismaClient } from '@prisma/client'
import type { ICreateManagementTeamDTO } from '../../dto/management-team.d.ts'
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
}
