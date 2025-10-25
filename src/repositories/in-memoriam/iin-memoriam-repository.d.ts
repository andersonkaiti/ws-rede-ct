import type { InMemoriam } from '@prisma/client'
import type {
  ICountInMemoriamDTO,
  ICreateInMemoriamDTO,
  IFindAllInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'

export interface IInMemoriamRepository {
  create(inMemoriam: ICreateInMemoriamDTO): Promise<InMemoriam>
  update(inMemoriam: IUpdateInMemoriamDTO): Promise<InMemoriam>
  find(data: IFindAllInMemoriamDTO): Promise<InMemoriam[] | null>
  findById(id: string): Promise<InMemoriam | null>
  count(data: ICountInMemoriamDTO): Promise<number>
}
