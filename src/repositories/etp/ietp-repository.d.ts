import type { ETP, Researcher, User } from '@prisma/client'
import type {
  ICountETPsDTO,
  ICreateETPDTO,
  IFindAllETPsDTO,
} from '../../dto/etp.d.ts'

type ReturnedETP = Omit<ETP, 'userId'>

type ReturnedETPWithResearcher = ReturnedETP & {
  leader: {
    id: string
    researcher: Researcher & {
      user: Omit<User, 'passwordHash'>
    }
  } | null
  deputyLeader: {
    id: string
    researcher: Researcher & {
      user: Omit<User, 'passwordHash'>
    }
  } | null
  secretary: {
    id: string
    researcher: Researcher & {
      user: Omit<User, 'passwordHash'>
    }
  } | null
  members: (Researcher & {
    user: Omit<User, 'passwordHash'>
  })[]
}

export interface IETPRepository {
  create(etp: ICreateETPDTO): Promise<ETP>
  find(data: IFindAllETPsDTO): Promise<ReturnedETPWithResearcher[] | null>
  findByCode(code: string): Promise<ReturnedETPWithResearcher | null>
  count(data: ICountETPsDTO): Promise<number>
}
