import type { ResearchGroup } from '@prisma/client'
import type {
  ICreateResearchGroupDTO,
  IUpdateResearchGroupDTO,
} from '../../dto/research-group.ts'

export interface IResearchGroupRepository {
  create(data: ICreateResearchGroupDTO): Promise<ResearchGroup>
  update(data: IUpdateResearchGroupDTO): Promise<void>
}
