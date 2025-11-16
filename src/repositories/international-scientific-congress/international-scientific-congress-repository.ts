import type { PrismaClient } from '@prisma/client'
import type { ICreateInternationalScientificCongressDTO } from '../../dto/international-scientific-congress/international-scientific-congress.js'
import type { IInternationalScientificCongressRepository } from './iinternational-scientific-congress-repository.d.ts'

export class InternationalScientificCongressRepository
  implements IInternationalScientificCongressRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(congress: ICreateInternationalScientificCongressDTO) {
    await this.prisma.internationalScientificCongress.create({
      data: congress,
    })
  }
}
