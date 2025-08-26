import type { Team } from '@prisma/client'
import type { ICreateTeamDTO, IUpdateTeamDTO } from '../../dto/team.d.ts'

export interface ITeamRepository {
  create(team: ICreateTeamDTO): Promise<Team>
  findAll(): Promise<Team[]>
  findById(id: string): Promise<Team | null>
  findByType(type: string): Promise<Team[] | null>
  update(team: IUpdateTeamDTO): Promise<Team>
  delete(id: string): Promise<void>
}
