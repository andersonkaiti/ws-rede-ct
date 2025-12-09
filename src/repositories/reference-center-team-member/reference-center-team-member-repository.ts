import type { PrismaClient } from '@prisma/client'
import type { ICreateReferenceCenterTeamMemberDTO } from '../../dto/reference-center-team-member.d.ts'
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
}
