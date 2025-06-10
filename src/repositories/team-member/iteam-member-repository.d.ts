import type { TeamMember } from "@prisma/client";
import type {
  ICreateTeamMemberDTO,
  IUpdateTeamMemberDTO,
  IUpdateTeamMembersDTO,
} from "../../dto/team-member.d.ts";

export interface ITeamMemberRepository {
  findMembersByTeamId(teamId: string): Promise<TeamMember[]>;
  create(teamMember: ICreateTeamMemberDTO): Promise<TeamMember>;
  update(teamMember: IUpdateTeamMemberDTO): Promise<TeamMember>;
  updateMany(team: IUpdateTeamMembersDTO): Promise<void>;
  delete(ids: string[]): Promise<void>;
}
