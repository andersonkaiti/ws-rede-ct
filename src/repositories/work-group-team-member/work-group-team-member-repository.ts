import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountWorkGroupTeamMembersDTO,
  ICreateWorkGroupTeamMemberDTO,
  IFindAllWorkGroupTeamMembersDTO,
  IUpdateWorkGroupTeamMemberDTO,
} from '../../dto/work-group-team-member.d.ts'
import type { IWorkGroupTeamMemberRepository } from './iwork-group-team-member-repository.d.ts'

export class WorkGroupTeamMemberRepository
  implements IWorkGroupTeamMemberRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(member: ICreateWorkGroupTeamMemberDTO) {
    await this.prisma.workGroupTeamMember.create({
      data: {
        ...member,
      },
    })
  }

  async update(member: IUpdateWorkGroupTeamMemberDTO) {
    const { id, ...memberData } = member

    await this.prisma.workGroupTeamMember.update({
      where: {
        id,
      },
      data: memberData,
    })
  }

  async find({
    pagination,
    filter: { role, orderBy },
  }: IFindAllWorkGroupTeamMembersDTO) {
    const where: Prisma.WorkGroupTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.workGroupTeamMember.findMany({
      where,
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      orderBy: {
        updatedAt: orderBy ?? 'desc',
      },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
    })
  }

  async findById(id: string) {
    return await this.prisma.workGroupTeamMember.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
    })
  }

  async count({ filter: { role } }: ICountWorkGroupTeamMembersDTO) {
    const where: Prisma.WorkGroupTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.workGroupTeamMember.count({
      where,
    })
  }
}
