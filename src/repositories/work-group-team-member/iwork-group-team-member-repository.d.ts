import type { ICreateWorkGroupTeamMemberDTO } from '../../dto/work-group-team-member.d.ts'

export interface IWorkGroupTeamMemberRepository {
  create(member: ICreateWorkGroupTeamMemberDTO): Promise<void>
}
