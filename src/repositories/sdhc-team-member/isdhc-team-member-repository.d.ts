import type { SDHCTeamMember, User } from '@prisma/client'
import type {
  ICountSDHCTeamMembersDTO,
  ICreateSDHCTeamMemberDTO,
  IFindAllSDHCTeamMembersDTO,
  IUpdateSDHCTeamMemberDTO,
} from '../../dto/sdhc-team-member.d.ts'

interface IReturnedSDHCTeamMember extends SDHCTeamMember {
  user: Omit<User, 'passwordHash'>
}

export interface ISDHCTeamMemberRepository {
  create(member: ICreateSDHCTeamMemberDTO): Promise<void>
  update(member: IUpdateSDHCTeamMemberDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllSDHCTeamMembersDTO
  ): Promise<IReturnedSDHCTeamMember[] | null>
  findById(id: string): Promise<IReturnedSDHCTeamMember | null>
  count(data: ICountSDHCTeamMembersDTO): Promise<number>
}
