import type { PrismaClient } from '@prisma/client'
import type {
  ICreateRegimentDTO,
  IUpdateRegimentDTO,
} from '../../dto/regiment.d.ts'
import type { IRegimentRepository } from './iregiment-repository.d.ts'

export class RegimentRepository implements IRegimentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(regiment: ICreateRegimentDTO) {
    return await this.prisma.regiment.create({
      data: regiment,
    })
  }

  async update(regiment: IUpdateRegimentDTO) {
    await this.prisma.regiment.update({
      where: {
        id: regiment.id,
      },
      data: regiment,
    })
  }
}
