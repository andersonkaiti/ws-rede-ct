import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IResearchGroupRepository } from '../../repositories/research-group/iresearch-group-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateResearchGroupSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nome é obrigatório.').optional(),
  acronym: z.string().optional(),
  description: z.string().optional(),
  url: z.url('URL deve ser válida.').optional(),
  foundedAt: z.coerce.date().optional(),
  scope: z.string().optional(),
  email: z.email('E-mail deve ser válido.').optional(),
  leaderId: z.uuid('Líder é obrigatório.').optional(),
  deputyLeaderId: z.uuid('Vice-líder é obrigatório.').optional(),
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

export class UpdateResearchGroupController {
  constructor(
    private readonly researchGroupRepository: IResearchGroupRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        logo,
        name,
        acronym,
        description,
        url,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      } = updateResearchGroupSchema.parse({
        id: req.params.id,
        ...req.body,
        logo: req.file,
      })

      const existingResearchGroup =
        await this.researchGroupRepository.findById(id)

      if (!existingResearchGroup) {
        throw new NotFoundError('O grupo de pesquisa não existe.')
      }

      let logoUrl = existingResearchGroup.logoUrl

      if (logo) {
        logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          id,
          folder: File.RESEARCH_GROUP_LOGO,
        })
      }

      await this.researchGroupRepository.update({
        id,
        name,
        acronym,
        description,
        url,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
        logoUrl,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
