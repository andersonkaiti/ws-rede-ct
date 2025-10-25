import type { PrismaClient } from '@prisma/client'
import type {
  ICreateInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'
import type { IInMemoriamRepository } from './iin-memoriam-repository.d.ts'

export class InMemoriamRepository implements IInMemoriamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(inMemoriam: ICreateInMemoriamDTO) {
    return await this.prisma.inMemoriam.create({
      data: inMemoriam,
    })
  }

  async update(inMemoriam: IUpdateInMemoriamDTO) {
    return await this.prisma.inMemoriam.update({
      where: {
        id: inMemoriam.id,
      },
      data: inMemoriam,
    })
  }
}
