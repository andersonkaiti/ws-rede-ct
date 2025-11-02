import type { PrismaClient } from '@prisma/client'
import type { ICreateLegitimatorCommitteeMemberDTO } from '../../dto/legitimator-committee-member.d.ts'
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
}
