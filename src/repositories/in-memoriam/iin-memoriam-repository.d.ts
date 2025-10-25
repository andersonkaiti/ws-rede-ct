import type { InMemoriam } from '@prisma/client'
import type {
  ICreateInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'

export interface IInMemoriamRepository {
  create(inMemoriam: ICreateInMemoriamDTO): Promise<InMemoriam>
  update(inMemoriam: IUpdateInMemoriamDTO): Promise<InMemoriam>
}
