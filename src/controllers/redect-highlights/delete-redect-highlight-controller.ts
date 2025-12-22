import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteRedeCTHighlightSchema = z.object({
  id: z.uuid(),
})

export class DeleteRedeCTHighlightController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteRedeCTHighlightSchema.parse(req.params)

    const existingHighlight = await this.redectHighlightRepository.findById(id)

    if (!existingHighlight) {
      throw new NotFoundError('O destaque não existe.')
    }

    await this.redectHighlightRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
