import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountReferenceCenterTeamMembersDTO,
  ICreateReferenceCenterTeamMemberDTO,
  IFindAllReferenceCenterTeamMembersDTO,
  IUpdateReferenceCenterTeamMemberDTO,
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

  async update(member: IUpdateReferenceCenterTeamMemberDTO) {
    const { id, ...memberData } = member

    await this.prisma.referenceCenterTeamMember.update({
      where: {
        id,
      },
      data: memberData,
    })
  }

  async deleteById(id: string) {
    await this.prisma.referenceCenterTeamMember.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination: { offset, limit },
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
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
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
