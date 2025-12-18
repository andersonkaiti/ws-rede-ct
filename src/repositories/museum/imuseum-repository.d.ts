import type { Museum } from '../../../config/database/generated/client.ts'
import type {
  ICountMuseumDTO,
  ICreateMuseumDTO,
  IFindAllMuseumDTO,
  IUpdateMuseumDTO,
} from '../../dto/museum.d.ts'

export interface IMuseumRepository {
  create(museum: ICreateMuseumDTO): Promise<Museum>
  update(museum: IUpdateMuseumDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(data: IFindAllMuseumDTO): Promise<Museum[] | null>
  findById(id: string): Promise<Museum | null>
  count(data: ICountMuseumDTO): Promise<number>
}
