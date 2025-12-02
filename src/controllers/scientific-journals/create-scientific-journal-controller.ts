import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IScientificJournalRepository } from '../../repositories/scientific-journal/iscientific-journal-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createScientificJournalSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  issn: z.string().min(1, 'ISSN é obrigatório.'),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  journalUrl: z.url('URL da revista deve ser válida.'),
  directors: z.string().optional(),
  editorialBoard: z.string().optional(),
  logo: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'O logo deve ser uma imagem válida de no máximo 5MB.'
    )
    .optional(),
})

export class CreateScientificJournalController {
  constructor(
    private readonly scientificJournalRepository: IScientificJournalRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        name,
        issn,
        description,
        journalUrl,
        directors,
        editorialBoard,
        logo,
      } = createScientificJournalSchema.parse({
        ...req.body,
        logo: req.file,
      })

      const scientificJournal = await this.scientificJournalRepository.create({
        name,
        issn,
        description,
        journalUrl,
        directors,
        editorialBoard,
      })

      if (logo) {
        const logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          folder: File.SCIENTIFIC_JOURNAL,
          id: scientificJournal.id,
        })

        await this.scientificJournalRepository.update({
          id: scientificJournal.id,
          logoUrl,
        })
      }

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
