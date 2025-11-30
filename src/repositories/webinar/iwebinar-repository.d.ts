import type { User, Webinar } from '@prisma/client'
import type {
  ICountWebinarsDTO,
  ICreateWebinarDTO,
  IFindWebinarsDTO,
  IUpdateWebinarDTO,
} from '../../dto/webinar.ts'

type WebinarWithGuests = Webinar & {
  guests: Omit<User, 'passwordHash'>[]
}

export interface IWebinarRepository {
  create(data: ICreateWebinarDTO): Promise<Webinar>
  find(data: IFindWebinarsDTO): Promise<WebinarWithGuests[] | null>
  update(data: IUpdateWebinarDTO): Promise<void>
  count(data: ICountWebinarsDTO): Promise<number>
}
