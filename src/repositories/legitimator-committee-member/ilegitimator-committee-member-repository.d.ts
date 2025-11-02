import type { SDHCTeamMember, User } from '@prisma/client'
import type {
  ICountLegitimatorCommitteeMembersDTO,
  ICreateLegitimatorCommitteeMemberDTO,
  IFindAllLegitimatorCommitteeMembersDTO,
} from '../../dto/legitimator-committee-member.d.ts'

interface IReturnedLegitimatorCommitteeMember extends SDHCTeamMember {
  user: Omit<User, 'passwordHash'>
}

export interface ILegitimatorCommitteeMemberRepository {
  create(member: ICreateLegitimatorCommitteeMemberDTO): Promise<void>
  find(
    data: IFindAllLegitimatorCommitteeMembersDTO
  ): Promise<IReturnedLegitimatorCommitteeMember[] | null>
  findById(id: string): Promise<IReturnedLegitimatorCommitteeMember | null>
  count(data: ICountLegitimatorCommitteeMembersDTO): Promise<number>
}
