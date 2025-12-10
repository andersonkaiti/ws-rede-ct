import type { ICreateLawDTO } from '../../dto/law.d.ts'

export interface ILawRepository {
  create(law: ICreateLawDTO): Promise<void>
}
