import type { Researcher, User } from '@prisma/client'
import type {
  ICountResearchersDTO,
  ICreateResearcherDTO,
  IFindAllResearchersDTO,
  IUpdateResearcherDTO,
} from '../../dto/researcher.d.ts'

type ReturnedResearcher = Omit<Researcher, 'userId'>

type ReturnedResearcherWithUser = ReturnedResearcher & {
  user: Omit<User, 'passwordHash'>
}

export interface IResearcherRepository {
  create(researcher: ICreateResearcherDTO): Promise<Researcher>
  update(researcher: IUpdateResearcherDTO): Promise<Researcher>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllResearchersDTO
  ): Promise<ReturnedResearcherWithUser[] | null>
  findById(id: string): Promise<ReturnedResearcherWithUser | null>
  findByUserId(userId: string): Promise<ReturnedResearcherWithUser | null>
  findByRegistrationNumber(
    registrationNumber: string
  ): Promise<ReturnedResearcherWithUser | null>
  count(data: ICountResearchersDTO): Promise<number>
}
