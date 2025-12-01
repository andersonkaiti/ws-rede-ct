import type { Event } from '@prisma/client'
import type {
  ICountEventsDTO,
  ICreateEventDTO,
  IFindAllEventDTO,
  IUpdateEventDTO,
} from '../../dto/event.d.ts'

export interface IEventRepository {
  create(event: ICreateEventDTO): Promise<Event>
  update(event: IUpdateEventDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(data: IFindAllEventDTO): Promise<Event[] | null>
  findById(id: string): Promise<Event | null>
  count(data: ICountEventsDTO): Promise<number>
}
