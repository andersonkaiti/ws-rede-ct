import type { PrismaClient, Webinar } from '@prisma/client'
import type { ICreateWebinarDTO, IUpdateWebinarDTO } from '../../dto/webinar.ts'
import type { IWebinarRepository } from './iwebinar-repository.ts'

export class WebinarRepository implements IWebinarRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    description,
    scheduledAt,
    webinarLink,
    thumbnailUrl,
    guestIds,
  }: ICreateWebinarDTO): Promise<Webinar> {
    return await this.prisma.webinar.create({
      data: {
        title,
        description,
        scheduledAt,
        webinarLink,
        thumbnailUrl,
        guests: guestIds
          ? {
              connect: guestIds.map((id) => ({ id })),
            }
          : undefined,
      },
    })
  }

  async update({
    id,
    title,
    description,
    scheduledAt,
    webinarLink,
    thumbnailUrl,
    guestIds,
  }: IUpdateWebinarDTO): Promise<void> {
    await this.prisma.webinar.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        scheduledAt,
        webinarLink,
        thumbnailUrl,
        guests: guestIds
          ? {
              connect: guestIds.map((guestId: string) => ({
                id: guestId,
              })),
            }
          : undefined,
      },
    })
  }
}
