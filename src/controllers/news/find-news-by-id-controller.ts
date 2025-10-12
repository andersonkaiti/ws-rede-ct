import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

extendZodWithOpenApi(z)

export const findNewsByIdSchema = z.object({
  id: z.string(),
})

export class FindNewsByIdController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findNewsByIdSchema.parse(req.params)

      const news = await this.newsRepository.findById(id)

      if (!news) {
        throw new NotFoundError('Notícia não encontrada.')
      }

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
