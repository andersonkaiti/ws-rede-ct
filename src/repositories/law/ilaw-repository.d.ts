import type { Law } from '@prisma/client'
import type {
  ICountLawsDTO,
  ICreateLawDTO,
  IFindAllLawsDTO,
} from '../../dto/law.d.ts'

export interface ILawRepository {
  create(law: ICreateLawDTO): Promise<void>
  find(data: IFindAllLawsDTO): Promise<Law[] | null>
  count(data: ICountLawsDTO): Promise<number>
}
