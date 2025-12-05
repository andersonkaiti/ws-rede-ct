import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

extendZodWithOpenApi(z)

export const findScientificArticleByIdSchema = z.object({
  id: z.uuid(),
})

export class FindScientificArticleByIdController {
  constructor(
    private readonly scientificArticlesRepository: IScientificArticlesRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findScientificArticleByIdSchema.parse({
        id: req.params.id,
      })

      const scientificArticle =
        await this.scientificArticlesRepository.findById(id)

      if (!scientificArticle) {
        throw new NotFoundError('Artigo científico não encontrado.')
      }

      return res.status(HttpStatus.OK).json(scientificArticle)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
