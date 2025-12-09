import type { ICreateReferenceCenterTeamMemberDTO } from '../../dto/reference-center-team-member.d.ts'

export interface IReferenceCenterTeamMemberRepository {
  create(member: ICreateReferenceCenterTeamMemberDTO): Promise<void>
}
