import type { PrismaClient } from '@prisma/client'
import type { ICreateRegionalCongressDTO } from '../../dto/regional-congress/regional-congress.js'
import type { IRegionalCongressRepository } from './iregional-congress-repository.d.ts'

export class RegionalCongressRepository implements IRegionalCongressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(congress: ICreateRegionalCongressDTO) {
    await this.prisma.regionalCongress.create({
      data: congress,
    })
  }
}
