import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountLegitimatorCommitteeMembersDTO,
  ICreateLegitimatorCommitteeMemberDTO,
  IFindAllLegitimatorCommitteeMembersDTO,
} from '../../dto/legitimator-committee-member.d.ts'
import type { ILegitimatorCommitteeMemberRepository } from './ilegitimator-committee-member-repository.d.ts'

export class LegitimatorCommitteeMemberRepository
  implements ILegitimatorCommitteeMemberRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(member: ICreateLegitimatorCommitteeMemberDTO) {
    await this.prisma.legitimatorCommitteeMember.create({
      data: member,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { role, orderBy },
  }: IFindAllLegitimatorCommitteeMembersDTO) {
    const where: Prisma.LegitimatorCommitteeMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.legitimatorCommitteeMember.findMany({
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
    return await this.prisma.legitimatorCommitteeMember.findFirst({
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

  async count({ filter: { role } }: ICountLegitimatorCommitteeMembersDTO) {
    const where: Prisma.LegitimatorCommitteeMemberWhereInput = {}

    if (role) {
      where.role = {
        contains: role,
        mode: 'insensitive',
      }
    }

    return await this.prisma.legitimatorCommitteeMember.count({
      where,
    })
  }
}
