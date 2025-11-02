export interface ICreateManagementTeamDTO {
  name: string
  description?: string
  members: {
    userId: string
    role: string
  }[]
}
