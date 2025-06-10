import { type PrismaClient, type TeamMember } from "@prisma/client";
import type {
  ICreateTeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from "../../dto/team-member.d.ts";
import type { ITeamMemberRepository } from "./iteam-member-repository.d.ts";

export class TeamMemberRepository implements ITeamMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMembersByTeamId(teamId: string): Promise<TeamMember[]> {
    return this.prisma.teamMember.findMany({
      where: {
        team_id: teamId,
      },
    });
  }

  async create(member: ICreateTeamMemberDTO): Promise<TeamMember> {
    return this.prisma.teamMember.create({
      data: member,
    });
  }

  async update({
    member: { id, ...member },
  }: IUpdateTeamMemberDTO): Promise<TeamMember> {
    return this.prisma.teamMember.update({
      where: {
        id,
      },
      data: member,
    });
  }

  async updateMany(team: IUpdateTeamMembersDTO): Promise<void> {
    const { id: team_id } = team;

    await Promise.all(
      team.members.map(({ id, role, ...member }) => {
        if (id) {
          return this.prisma.teamMember.upsert({
            where: {
              id,
            },
            update: {
              role,
            },
            create: {
              ...member,
              team_id,
              role,
            },
          });
        } else {
          return this.prisma.teamMember.create({
            data: {
              ...member,
              team_id,
              role,
            },
          });
        }
      })
    );
  }

  async delete(ids: string[]): Promise<void> {
    await this.prisma.teamMember.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
