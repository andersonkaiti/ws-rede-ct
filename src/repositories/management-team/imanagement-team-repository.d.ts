import type { ManagementTeamMember, User } from '@prisma/client'
import type {
  ICountManagementTeamsDTO,
  ICreateManagementTeamDTO,
  IFindAllManagementTeamsDTO,
  IUpdateManagementTeamDTO,
} from '../../dto/management-team.d.ts'

type ReturnedManagementTeam = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  members: (ManagementTeamMember & {
    user: Omit<User, 'passwordHash'>
  })[]
}

export interface IManagementTeamRepository {
  create(team: ICreateManagementTeamDTO): Promise<void>
  update(team: IUpdateManagementTeamDTO): Promise<void>
  find(
    data: IFindAllManagementTeamsDTO
  ): Promise<ReturnedManagementTeam[] | null>
  findById(id: string): Promise<ReturnedManagementTeam | null>
  findByName(name: string): Promise<ReturnedManagementTeam | null>
  count(data: ICountManagementTeamsDTO): Promise<number>
}
