import type { PrismaClient } from '@prisma/client'
import type { ICreateWorkGroupTeamMemberDTO } from '../../dto/work-group-team-member.d.ts'
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
}
