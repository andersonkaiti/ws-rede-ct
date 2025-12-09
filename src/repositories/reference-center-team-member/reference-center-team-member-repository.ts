import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountReferenceCenterTeamMembersDTO,
  ICreateReferenceCenterTeamMemberDTO,
  IFindAllReferenceCenterTeamMembersDTO,
} from '../../dto/reference-center-team-member.d.ts'
import type { IReferenceCenterTeamMemberRepository } from './ireference-center-team-member-repository.d.ts'

export class ReferenceCenterTeamMemberRepository
  implements IReferenceCenterTeamMemberRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(member: ICreateReferenceCenterTeamMemberDTO) {
    await this.prisma.referenceCenterTeamMember.create({
      data: {
        ...member,
      },
    })
  }

  async find({
    pagination,
    filter: { role, orderBy },
  }: IFindAllReferenceCenterTeamMembersDTO) {
    const where: Prisma.ReferenceCenterTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.referenceCenterTeamMember.findMany({
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
    return await this.prisma.referenceCenterTeamMember.findFirst({
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

  async count({ filter: { role } }: ICountReferenceCenterTeamMembersDTO) {
    const where: Prisma.ReferenceCenterTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.referenceCenterTeamMember.count({
      where,
    })
  }
}
