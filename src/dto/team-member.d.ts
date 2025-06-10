export interface ITeamMemberDTO {
  role: string;
  team_id: string;
  user_id: string;
  description?: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICreateTeamMemberDTO extends ITeamMemberDTO {}

export interface IUpdateTeamMemberDTO {
  member: ITeamMemberDTO;
}

export interface IUpdateTeamMembersDTO extends IUpdateTeamDTO {
  id: string;
  name: string;
  members: ICreateTeamMemberDTO[];
}
