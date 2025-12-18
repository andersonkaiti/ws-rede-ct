import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IScientificJournalRepository } from '../../repositories/scientific-journal/iscientific-journal-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateScientificJournalSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nome é obrigatório.').optional(),
  issn: z.string().min(1, 'ISSN é obrigatório.').optional(),
  description: z.string().min(1, 'Descrição é obrigatória.').optional(),
  journalUrl: z.url('URL da revista deve ser válida.').optional(),
  directors: z.string().optional(),
  editorialBoard: z.string().optional(),
  logo: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `O logo deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateScientificJournalController {
  constructor(
    private readonly scientificJournalRepository: IScientificJournalRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      logo,
      name,
      issn,
      description,
      journalUrl,
      directors,
      editorialBoard,
    } = updateScientificJournalSchema.parse({
      id: req.params.id,
      ...req.body,
      logo: req.file,
    })

    const existingScientificJournal =
      await this.scientificJournalRepository.findById(id)

    if (!existingScientificJournal) {
      throw new NotFoundError('A revista científica não existe.')
    }

    let logoUrl = existingScientificJournal.logoUrl

    if (logo) {
      logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id,
        folder: File.SCIENTIFIC_JOURNAL,
      })
    }

    await this.scientificJournalRepository.update({
      id,
      name,
      issn,
      description,
      journalUrl,
      directors,
      editorialBoard,
      logoUrl,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
