import type { Event } from '@prisma/client'
import type { ICreateEventDTO, IUpdateEventDTO } from '../../dto/event.d.ts'

export interface IEventRepository {
  create(event: ICreateEventDTO): Promise<Event>
  update(event: IUpdateEventDTO): Promise<void>
}
