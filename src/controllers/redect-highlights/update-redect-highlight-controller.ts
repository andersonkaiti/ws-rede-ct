import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

extendZodWithOpenApi(z)

export const updateRedeCTHighlightSchema = z.object({
  id: z.uuid(),
  type: z.enum(['PERSON', 'INSTITUTION']).optional(),
  description: z.string().optional(),
  honorableMention: z.coerce.boolean().optional(),
  honoredAt: z.coerce.date().optional(),
  meritUrl: z.string().url('URL do mérito deve ser válida').optional(),
  userId: z.string().uuid('ID do usuário deve ser válido').optional(),
})

export class UpdateRedeCTHighlightController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      type,
      description,
      honorableMention,
      honoredAt,
      meritUrl,
      userId,
    } = updateRedeCTHighlightSchema.parse({
      id: req.params.id,
      ...req.body,
    })

    const existingHighlight = await this.redectHighlightRepository.findById(id)

    if (!existingHighlight) {
      throw new NotFoundError('O destaque não existe.')
    }

    await this.redectHighlightRepository.update({
      id,
      type,
      description,
      honorableMention,
      honoredAt,
      meritUrl,
      userId,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
