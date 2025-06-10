import { type PrismaClient, type Team } from "@prisma/client";
import type { ICreateTeamMemberDTO } from "../../dto/team-member.d.ts";
import type { IUpdateTeamDTO } from "../../dto/team.d.ts";
import type { ITeamRepository } from "./iteam-repository.d.ts";

export class TeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(team: ICreateTeamMemberDTO): Promise<Team> {
    return await this.prisma.team.create({
      data: {
        name: team.name,
        type: team.type,
        team_members: {
          create: team.members.map((member) => ({
            role: member.role,
            description: member.description,
            user_id: member.user_id,
          })),
        },
      },
    });
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
    });
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
    });
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
    });
  }

  async update(team: IUpdateTeamDTO): Promise<Team> {
    return await this.prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        name: team.name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.team.delete({
      where: {
        id,
      },
    });
  }
}
