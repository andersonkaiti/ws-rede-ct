import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountSDHCTeamMembersDTO,
  ICreateSDHCTeamMemberDTO,
  IFindAllSDHCTeamMembersDTO,
} from '../../dto/sdhc-team-member.d.ts'
import type { ISDHCTeamMemberRepository } from './isdhc-team-member-repository.d.ts'

export class SDHCTeamMemberRepository implements ISDHCTeamMemberRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(member: ICreateSDHCTeamMemberDTO) {
    await this.prisma.sDHCTeamMember.create({
      data: member,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { role, orderBy },
  }: IFindAllSDHCTeamMembersDTO) {
    const where: Prisma.SDHCTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.sDHCTeamMember.findMany({
      where,
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      orderBy: orderBy
        ? {
            updatedAt: orderBy,
          }
        : {
            updatedAt: 'desc',
          },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.sDHCTeamMember.findFirst({
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

  async count({ filter: { role } }: ICountSDHCTeamMembersDTO) {
    const where: Prisma.SDHCTeamMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.sDHCTeamMember.count({
      where,
    })
  }
}
