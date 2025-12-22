import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RedeCTHighlightType } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

extendZodWithOpenApi(z)

export const createRedeCTHighlightSchema = z.object({
  type: z.enum(RedeCTHighlightType),
  description: z.string().optional(),
  honorableMention: z.coerce.boolean().optional(),
  honoredAt: z.coerce.date(),
  meritUrl: z.string().url('URL do mérito deve ser válida').optional(),
  userId: z.string().uuid('ID do usuário deve ser válido'),
})

export class CreateRedeCTHighlightController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { type, description, honorableMention, honoredAt, meritUrl, userId } =
      createRedeCTHighlightSchema.parse(req.body)

    await this.redectHighlightRepository.create({
      type,
      description,
      honorableMention,
      honoredAt,
      meritUrl,
      userId,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
