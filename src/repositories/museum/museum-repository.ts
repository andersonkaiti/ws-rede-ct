import type { PrismaClient } from '@prisma/client'
import type { ICreateMuseumDTO, IUpdateMuseumDTO } from '../../dto/museum.d.ts'
import type { IMuseumRepository } from './imuseum-repository.d.ts'

export class MuseumRepository implements IMuseumRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(museum: ICreateMuseumDTO) {
    return await this.prisma.museum.create({
      data: museum,
    })
  }

  async update(museum: IUpdateMuseumDTO) {
    await this.prisma.museum.update({
      where: {
        id: museum.id,
      },
      data: museum,
    })
  }
}
