import { PrismaClient, type Team } from "@prisma/client";
import type { ICreateTeamDTO, IUpdateTeamDTO } from "../../dto/team.d.ts";
import type { ITeamRepository } from "./iteam-repository.d.ts";

export class TeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(team: ICreateTeamDTO): Promise<Team> {
    return await this.prisma.team.create({
      data: {
        name: team.name,
        type: team.type,
        team_members: {
          create: team.members.map((member) => ({
            name: member.name,
            role: member.role,
            user_id: member.user_id,
          })),
        },
      },
    });
  }

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany({
      include: {
        team_members: true,
      },
    });
  }

  async findById(id: string): Promise<Team | null> {
    return await this.prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        team_members: true,
      },
    });
  }

  async findByType(type: string): Promise<Team[] | null> {
    return await this.prisma.team.findMany({
      where: {
        type,
      },
      include: {
        team_members: true,
      },
    });
  }

  async update(team: IUpdateTeamDTO): Promise<Team> {
    const existingMembers = await this.prisma.teamMember.findMany({
      where: {
        team_id: team.id,
      },
    });

    const incomingIds = team.members.map((member) => member.id);

    const membersToDelete = existingMembers.filter(
      (member) => !incomingIds.includes(member.id)
    );

    for (const member of membersToDelete) {
      await this.prisma.teamMember.delete({
        where: {
          id: member.id,
        },
      });
    }

    for (const member of team.members) {
      const memberData = {
        name: member.name,
        role: member.role,
        user_id: member.user_id,
      };

      if (member.id) {
        await this.prisma.teamMember.upsert({
          where: {
            id: member.id,
          },
          update: memberData,
          create: {
            ...memberData,
            team_id: team.id,
          },
        });
      } else {
        await this.prisma.teamMember.create({
          data: {
            ...memberData,
            team_id: team.id,
          },
        });
      }
    }

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
