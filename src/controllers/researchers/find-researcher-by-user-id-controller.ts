import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

extendZodWithOpenApi(z)

export const findResearcherByUserIdSchema = z.object({
  id: z.uuid(),
})

export class FindResearcherByUserIdController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findResearcherByUserIdSchema.parse(req.params)

      const researcher = await this.researcherRepository.findByUserId(id)

      if (!researcher) {
        throw new NotFoundError('O pesquisador não existe para este usuário.')
      }

      return res.status(HttpStatus.OK).json(researcher)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
