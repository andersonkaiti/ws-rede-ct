import type { InMemoriam, InMemoriamRole } from '@prisma/client'
import type {
  ICountInMemoriamDTO,
  ICreateInMemoriamDTO,
  IFindAllInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'

export interface IInMemoriamRepository {
  create(inMemoriam: ICreateInMemoriamDTO): Promise<InMemoriam>
  update(inMemoriam: IUpdateInMemoriamDTO): Promise<InMemoriam>
  deleteById(id: string): Promise<void>
  find(data: IFindAllInMemoriamDTO): Promise<InMemoriam[] | null>
  findById(id: string): Promise<InMemoriam | null>
  findByRole(role: InMemoriamRole): Promise<InMemoriam[] | null>
  count(data: ICountInMemoriamDTO): Promise<number>
}
