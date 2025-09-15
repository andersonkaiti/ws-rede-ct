import type { PrismaClient } from '@prisma/client'
import type { ICreatePendencyDTO } from '../../dto/pendency.ts'
import type { IPendencyRepository } from './ipendency-repository.ts'

export class PendencyRepository implements IPendencyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: ICreatePendencyDTO): Promise<void> {
    await this.prisma.pendency.create({
      data,
    })
  }
}
