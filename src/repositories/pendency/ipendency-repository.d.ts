import type { ICreatePendencyDTO } from '../../dto/pendency.ts'

export interface IPendencyRepository {
  create(data: ICreatePendencyDTO): Promise<void>
}
