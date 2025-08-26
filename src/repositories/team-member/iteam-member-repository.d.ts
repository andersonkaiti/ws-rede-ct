import type { TeamMember } from '@prisma/client'
import type {
  ICreateTeamMemberDTO,
  ITeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from '../../dto/team-member.d.ts'

export interface ITeamMemberRepository {
  findByTeamId(teamId: string): Promise<TeamMember[]>
  create(teamMember: ICreateTeamMemberDTO): Promise<TeamMember>
  update(teamMember: IUpdateTeamMemberDTO): Promise<TeamMember>
  updateMany(team: IUpdateTeamMembersDTO): Promise<void>
  delete(id: ITeamMemberDTO['id']): Promise<void>
  deleteMany(ids: ITeamMemberDTO['id'][]): Promise<void>
}
