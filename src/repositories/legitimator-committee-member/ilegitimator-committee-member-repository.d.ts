import type { ICreateLegitimatorCommitteeMemberDTO } from '../../dto/legitimator-committee-member.d.ts'

export interface ILegitimatorCommitteeMemberRepository {
  create(member: ICreateLegitimatorCommitteeMemberDTO): Promise<void>
}
