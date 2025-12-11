import type { Museum } from '@prisma/client'
import type { ICreateMuseumDTO, IUpdateMuseumDTO } from '../../dto/museum.d.ts'

export interface IMuseumRepository {
  create(museum: ICreateMuseumDTO): Promise<Museum>
  update(museum: IUpdateMuseumDTO): Promise<void>
}
