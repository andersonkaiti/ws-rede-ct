import type { PrismaClient, Team } from '@prisma/client'
import type { ICreateTeamDTO, IUpdateTeamDTO } from '../../dto/team.d.ts'
import type { ITeamRepository } from './iteam-repository.d.ts'

export class TeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ members, name, type }: ICreateTeamDTO): Promise<Team> {
    return await this.prisma.team.create({
      data: {
        name,
        type,
        team_members: {
          create: members.map((member) => ({
            role: member.role,
            user: {
              connect: {
                id: member.user.id,
              },
            },
          })),
        },
      },
    })
  }

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany({
      include: {
        team_members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findById(id: string): Promise<Team | null> {
    return await this.prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        team_members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findByType(type: string): Promise<Team[] | null> {
    return await this.prisma.team.findMany({
      where: {
        type,
      },
      include: {
        team_members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async update({ id, name }: IUpdateTeamDTO): Promise<Team> {
    return await this.prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.team.delete({
      where: {
        id,
      },
    })
  }
}
