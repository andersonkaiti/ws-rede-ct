import type { PrismaClient, TeamMember } from '@prisma/client'
import type {
  ICreateTeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from '../../dto/team-member.d.ts'
import type { ITeamMemberRepository } from './iteam-member-repository.d.ts'

export class TeamMemberRepository implements ITeamMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<TeamMember | null> {
    return await this.prisma.teamMember.findFirst({
      where: {
        id,
      },
    })
  }

  async findByTeamId(teamId: string) {
    return await this.prisma.teamMember.findMany({
      where: {
        teamId,
      },
    })
  }

  async create({ description, role, teamId, userId }: ICreateTeamMemberDTO) {
    return await this.prisma.teamMember.create({
      data: {
        role,
        description,
        teamId,
        userId,
      },
    })
  }

  async update({ id, ...member }: IUpdateTeamMemberDTO) {
    return await this.prisma.teamMember.update({
      where: {
        id,
      },
      data: member,
    })
  }

  async updateMany({ members, teamId }: IUpdateTeamMembersDTO) {
    await Promise.all(
      members.map(async ({ user, role }) => {
        const existingMember = await this.prisma.teamMember.findFirst({
          where: {
            teamId,
            userId: user.id,
          },
          include: {
            user: true,
          },
        })

        if (existingMember) {
          await this.prisma.teamMember.update({
            where: {
              id: existingMember.id,
            },
            data: {
              role,
            },
          })
        } else {
          await this.prisma.teamMember.create({
            data: {
              teamId,
              userId: user.id,
              role,
            },
          })
        }
      })
    )
  }

  async delete(id: string) {
    await this.prisma.teamMember.deleteMany({
      where: {
        id,
      },
    })
  }

  async deleteMany(ids: string[]) {
    await Promise.all(
      ids.map(async (id) => {
        await this.prisma.teamMember.delete({
          where: {
            id,
          },
        })
      })
    )
  }
}
