import type { ReferenceCenterTeamMember, User } from '@prisma/client'
import type {
  ICountReferenceCenterTeamMembersDTO,
  ICreateReferenceCenterTeamMemberDTO,
  IFindAllReferenceCenterTeamMembersDTO,
} from '../../dto/reference-center-team-member.d.ts'

interface IReturnedReferenceCenterTeamMember extends ReferenceCenterTeamMember {
  user: Omit<User, 'passwordHash'>
}

export interface IReferenceCenterTeamMemberRepository {
  create(member: ICreateReferenceCenterTeamMemberDTO): Promise<void>
  find(
    data: IFindAllReferenceCenterTeamMembersDTO
  ): Promise<IReturnedReferenceCenterTeamMember[] | null>
  findById(id: string): Promise<IReturnedReferenceCenterTeamMember | null>
  count(data: ICountReferenceCenterTeamMembersDTO): Promise<number>
}
