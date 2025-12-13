import type {
  User,
  Webinar,
} from '../../../config/database/generated/client.ts'
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
  findById(id: string): Promise<WebinarWithGuests | null>
  update(data: IUpdateWebinarDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountWebinarsDTO): Promise<number>
}
