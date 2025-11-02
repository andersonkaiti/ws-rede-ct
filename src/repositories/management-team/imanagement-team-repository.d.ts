import type { ManagementTeamMember, User } from '@prisma/client'
import type { ICreateManagementTeamDTO } from '../../dto/management-team.d.ts'

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
  findByName(name: string): Promise<ReturnedManagementTeam | null>
}
