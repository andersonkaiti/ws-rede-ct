import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IScientificJournalRepository } from '../../repositories/scientific-journal/iscientific-journal-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteScientificJournalSchema = z.object({
  id: z.uuid(),
})

export class DeleteScientificJournalController {
  constructor(
    private readonly scientificJournalRepository: IScientificJournalRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteScientificJournalSchema.parse({
        id: req.params.id,
      })

      const existingScientificJournal =
        await this.scientificJournalRepository.findById(id)

      if (!existingScientificJournal) {
        throw new NotFoundError('A revista científica não existe.')
      }

      if (existingScientificJournal.logoUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingScientificJournal.logoUrl,
        })
      }

      await this.scientificJournalRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
