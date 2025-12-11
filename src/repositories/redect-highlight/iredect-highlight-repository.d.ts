import type { RedeCTHighlight } from '@prisma/client'
import type {
  ICountRedeCTHighlightDTO,
  ICreateRedeCTHighlightDTO,
  IFindAllRedeCTHighlightDTO,
  IUpdateRedeCTHighlightDTO,
} from '../../dto/redect-highlight.d.ts'

export interface IRedeCTHighlightRepository {
  create(highlight: ICreateRedeCTHighlightDTO): Promise<RedeCTHighlight>
  update(highlight: IUpdateRedeCTHighlightDTO): Promise<void>
  find(data: IFindAllRedeCTHighlightDTO): Promise<RedeCTHighlight[] | null>
  count(data: ICountRedeCTHighlightDTO): Promise<number>
}
