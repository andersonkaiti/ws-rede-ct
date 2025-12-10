import type { Law } from '@prisma/client'
import type {
  ICountLawsDTO,
  ICreateLawDTO,
  IFindAllLawsDTO,
  IUpdateLawDTO,
} from '../../dto/law.d.ts'

export interface ILawRepository {
  create(law: ICreateLawDTO): Promise<void>
  update(law: IUpdateLawDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(data: IFindAllLawsDTO): Promise<Law[] | null>
  findById(id: string): Promise<Law | null>
  count(data: ICountLawsDTO): Promise<number>
}
