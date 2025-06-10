import { ITeamMemberDTO } from "./team-member.js";

export interface ICreateTeamDTO {
  name: string;
  type: string;
  members: Omit<ITeamMemberDTO, "team_id">[];
}

export interface IUpdateTeamDTO {
  id: string;
  name: string;
}
