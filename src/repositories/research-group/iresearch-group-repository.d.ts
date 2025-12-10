import type { ResearchGroup, User } from '@prisma/client'
import type {
  ICountResearchGroupsDTO,
  ICreateResearchGroupDTO,
  IFindResearchGroupsDTO,
  IUpdateResearchGroupDTO,
} from '../../dto/research-group.ts'

interface ResearchGroupWithLeaders extends ResearchGroup {
  leader: Omit<User, 'passwordHash'>
  deputyLeader: Omit<User, 'passwordHash'>
}

export interface IResearchGroupRepository {
  create(data: ICreateResearchGroupDTO): Promise<ResearchGroup>
  find(data: IFindResearchGroupsDTO): Promise<ResearchGroupWithLeaders[] | null>
  update(data: IUpdateResearchGroupDTO): Promise<void>
  count(data: ICountResearchGroupsDTO): Promise<number>
}
