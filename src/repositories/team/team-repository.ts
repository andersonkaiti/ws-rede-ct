import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICreateTeamDTO,
  IFindByTypeDTO,
  IUpdateTeamDTO,
} from '../../dto/team.d.ts'
import type { ITeamRepository } from './iteam-repository.d.ts'

export class TeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ members, name, type }: ICreateTeamDTO) {
    return await this.prisma.team.create({
      data: {
        name,
        type,
        members: {
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

  async findAll() {
    return await this.prisma.team.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findById(id: string) {
    return await this.prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findByType({ type, filter: { name } }: IFindByTypeDTO) {
    const where: Prisma.TeamWhereInput = {
      type,
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    return await this.prisma.team.findMany({
      where,
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async update({ id, name }: IUpdateTeamDTO) {
    return await this.prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  }

  async delete(id: string) {
    await this.prisma.team.delete({
      where: {
        id,
      },
    })
  }
}
