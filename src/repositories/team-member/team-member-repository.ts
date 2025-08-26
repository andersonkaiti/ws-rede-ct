import type { PrismaClient, TeamMember } from '@prisma/client'
import type {
  ICreateTeamMemberDTO,
  ITeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from '../../dto/team-member.d.ts'
import type { ITeamMemberRepository } from './iteam-member-repository.d.ts'

export class TeamMemberRepository implements ITeamMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByTeamId(teamId: string): Promise<TeamMember[]> {
    return await this.prisma.teamMember.findMany({
      where: {
        team_id: teamId,
      },
    })
  }

  async create(member: ICreateTeamMemberDTO): Promise<TeamMember> {
    return await this.prisma.teamMember.create({
      data: member,
    })
  }

  async update({
    member: { id, ...member },
  }: IUpdateTeamMemberDTO): Promise<TeamMember> {
    return await this.prisma.teamMember.update({
      where: {
        id,
      },
      data: member,
    })
  }

  async updateMany({ id, members }: IUpdateTeamMembersDTO): Promise<void> {
    await Promise.all(
      members.map(async (member) => {
        const existingMember = await this.prisma.teamMember.findFirst({
          where: {
            team_id: id,
            user_id: member.user.id,
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
              team_id: id,
              user_id: member.user.id,
              role: member.role,
            },
          })
        }
      })
    )
  }

  async deleteMany(ids: ITeamMemberDTO['id'][]): Promise<void> {
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
