import type { PrismaClient } from '@prisma/client'
import type {
  ICreateTeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from '../../dto/team-member.d.ts'
import type { ITeamMemberRepository } from './iteam-member-repository.d.ts'

export class TeamMemberRepository implements ITeamMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByTeamId(teamId: string) {
    return await this.prisma.teamMember.findMany({
      where: {
        teamId,
      },
    })
  }

  async create(teamMember: ICreateTeamMemberDTO) {
    return await this.prisma.teamMember.create({
      data: teamMember,
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

  async updateMany({ id, members }: IUpdateTeamMembersDTO) {
    await Promise.all(
      members.map(async (member) => {
        const existingMember = await this.prisma.teamMember.findFirst({
          where: {
            teamId: id,
            userId: member.user.id,
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
              role: member.role,
            },
          })
        } else {
          await this.prisma.teamMember.create({
            data: {
              teamId: id,
              userId: member.user.id,
              role: member.role,
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
