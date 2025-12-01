import type { PrismaClient } from '@prisma/client'
import type { ICreateEventDTO, IUpdateEventDTO } from '../../dto/event.d.ts'
import type { IEventRepository } from './ievent-repository.d.ts'

export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(event: ICreateEventDTO) {
    return await this.prisma.event.create({
      data: event,
    })
  }

  async update(event: IUpdateEventDTO) {
    await this.prisma.event.update({
      where: {
        id: event.id,
      },
      data: event,
    })
  }
}
