import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IScientificJournalRepository } from '../../repositories/scientific-journal/iscientific-journal-repository.ts'

extendZodWithOpenApi(z)

export const findScientificJournalByIdSchema = z.object({
  id: z.uuid(),
})

export class FindScientificJournalByIdController {
  constructor(
    private readonly scientificJournalRepository: IScientificJournalRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findScientificJournalByIdSchema.parse({
        id: req.params.id,
      })

      const scientificJournal =
        await this.scientificJournalRepository.findById(id)

      if (!scientificJournal) {
        throw new NotFoundError('Revista científica não encontrada.')
      }

      return res.status(HttpStatus.OK).json(scientificJournal)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
