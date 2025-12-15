import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IResearchGroupRepository } from '../../repositories/research-group/iresearch-group-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createResearchGroupSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  acronym: z.string().optional(),
  description: z.string().optional(),
  url: z.url('URL deve ser válida.').optional(),
  foundedAt: z.coerce.date(),
  scope: z.string().optional(),
  email: z.email('E-mail deve ser válido.').optional(),
  leaderId: z.uuid('Líder é obrigatório.'),
  deputyLeaderId: z.uuid('Vice-líder é obrigatório.'),
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
      'O logo deve ser uma imagem válida de no máximo 5MB.',
    )
    .optional(),
})

export class CreateResearchGroupController {
  constructor(
    private readonly researchGroupRepository: IResearchGroupRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        name,
        acronym,
        description,
        url,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
        logo,
      } = createResearchGroupSchema.parse({
        ...req.body,
        logo: req.file,
      })

      const researchGroup = await this.researchGroupRepository.create({
        name,
        acronym,
        description,
        url,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      })

      if (logo) {
        const logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          folder: File.RESEARCH_GROUP_LOGO,
          id: researchGroup.id,
        })

        await this.researchGroupRepository.update({
          id: researchGroup.id,
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
