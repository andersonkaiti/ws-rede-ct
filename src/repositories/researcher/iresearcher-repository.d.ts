import type { Researcher, User } from '@prisma/client'
import type { ICreateResearcherDTO } from '../../dto/researcher.d.ts'

type ReturnedResearcher = Omit<Researcher, 'userId'>

type ReturnedResearcherWithUser = ReturnedResearcher & {
  user: Omit<User, 'passwordHash'>
}

export interface IResearcherRepository {
  create(researcher: ICreateResearcherDTO): Promise<Researcher>
  findByUserId(userId: string): Promise<ReturnedResearcherWithUser | null>
  findByRegistrationNumber(
    registrationNumber: string
  ): Promise<ReturnedResearcherWithUser | null>
}
