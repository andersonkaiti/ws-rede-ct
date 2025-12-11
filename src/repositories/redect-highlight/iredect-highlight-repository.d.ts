import type { RedeCTHighlight } from '@prisma/client'
import type {
  ICreateRedeCTHighlightDTO,
  IUpdateRedeCTHighlightDTO,
} from '../../dto/redect-highlight.d.ts'

export interface IRedeCTHighlightRepository {
  create(highlight: ICreateRedeCTHighlightDTO): Promise<RedeCTHighlight>
  update(highlight: IUpdateRedeCTHighlightDTO): Promise<void>
}
