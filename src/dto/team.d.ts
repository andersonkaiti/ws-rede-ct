export interface ITeamMemberDTO {
  id?: string;
  name: string;
  role: string;
  user_id: string;
  team_id?: string;
}

export interface ICreateTeamMemberDTO extends ITeamMemberDTO {}

export interface ICreateTeamDTO {
  name: string;
  type: string;
  members: ICreateTeamMemberDTO[];
}

export interface IUpdateTeamDTO {
  id: string;
  name: string;
  members: ITeamMemberDTO[];
}
