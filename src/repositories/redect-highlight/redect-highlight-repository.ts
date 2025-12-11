import type { PrismaClient } from '@prisma/client'
import type {
  ICreateRedeCTHighlightDTO,
  IUpdateRedeCTHighlightDTO,
} from '../../dto/redect-highlight.d.ts'
import type { IRedeCTHighlightRepository } from './iredect-highlight-repository.d.ts'

export class RedeCTHighlightRepository implements IRedeCTHighlightRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(highlight: ICreateRedeCTHighlightDTO) {
    return await this.prisma.redeCTHighlight.create({
      data: highlight,
    })
  }

  async update(highlight: IUpdateRedeCTHighlightDTO) {
    await this.prisma.redeCTHighlight.update({
      where: {
        id: highlight.id,
      },
      data: highlight,
    })
  }
}
