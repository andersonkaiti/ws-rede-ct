import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

extendZodWithOpenApi(z)

export const findResearcherByIdSchema = z.object({
  id: z.uuid(),
})

export class FindResearcherByIdController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findResearcherByIdSchema.parse({
        id: req.params.id,
      })

      const researcher = await this.researcherRepository.findById(id)

      if (!researcher) {
        throw new NotFoundError('O pesquisador não existe.')
      }

      return res.status(HttpStatus.OK).json(researcher)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
