import type { ReferenceCenterTeamMember, User } from '@prisma/client'
import type {
  ICountReferenceCenterTeamMembersDTO,
  ICreateReferenceCenterTeamMemberDTO,
  IFindAllReferenceCenterTeamMembersDTO,
  IUpdateReferenceCenterTeamMemberDTO,
} from '../../dto/reference-center-team-member.d.ts'

interface IReturnedReferenceCenterTeamMember extends ReferenceCenterTeamMember {
  user: Omit<User, 'passwordHash'>
}

export interface IReferenceCenterTeamMemberRepository {
  create(member: ICreateReferenceCenterTeamMemberDTO): Promise<void>
  update(member: IUpdateReferenceCenterTeamMemberDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllReferenceCenterTeamMembersDTO
  ): Promise<IReturnedReferenceCenterTeamMember[] | null>
  findById(id: string): Promise<IReturnedReferenceCenterTeamMember | null>
  count(data: ICountReferenceCenterTeamMembersDTO): Promise<number>
}
