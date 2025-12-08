import type { User, WorkGroupTeamMember } from '@prisma/client'
import type {
  ICountWorkGroupTeamMembersDTO,
  ICreateWorkGroupTeamMemberDTO,
  IFindAllWorkGroupTeamMembersDTO,
} from '../../dto/work-group-team-member.d.ts'

interface IReturnedWorkGroupTeamMember extends WorkGroupTeamMember {
  user: Omit<User, 'passwordHash'>
}

export interface IWorkGroupTeamMemberRepository {
  create(member: ICreateWorkGroupTeamMemberDTO): Promise<void>
  find(
    data: IFindAllWorkGroupTeamMembersDTO
  ): Promise<IReturnedWorkGroupTeamMember[] | null>
  count(data: ICountWorkGroupTeamMembersDTO): Promise<number>
}
