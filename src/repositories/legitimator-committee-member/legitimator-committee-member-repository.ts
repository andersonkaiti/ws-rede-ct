import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountLegitimatorCommitteeMembersDTO,
  ICreateLegitimatorCommitteeMemberDTO,
  IFindAllLegitimatorCommitteeMembersDTO,
  IUpdateLegitimatorCommitteeMemberDTO,
} from '../../dto/legitimator-committee-member.d.ts'
import type { ILegitimatorCommitteeMemberRepository } from './ilegitimator-committee-member-repository.d.ts'

export class LegitimatorCommitteeMemberRepository
  implements ILegitimatorCommitteeMemberRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(member: ICreateLegitimatorCommitteeMemberDTO) {
    await this.prisma.legitimatorCommitteeMember.create({
      data: {
        ...member,
        order: member.order ?? 0,
      },
    })
  }

  async update(member: IUpdateLegitimatorCommitteeMemberDTO) {
    const { id, ...memberData } = member

    await this.prisma.legitimatorCommitteeMember.update({
      where: {
        id,
      },
      data: memberData,
    })
  }

  async deleteById(id: string) {
    await this.prisma.legitimatorCommitteeMember.delete({
      where: {
        id,
      },
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
      orderBy: {
        updatedAt: orderBy,
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
