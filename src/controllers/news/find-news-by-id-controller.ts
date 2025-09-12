import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

extendZodWithOpenApi(z)

export const findNewsByIdSchema = z.object({
  id: z.string(),
})

export class FindNewsByIdController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findNewsByIdSchema.safeParse(req.params)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      const news = await this.newsRepository.findById(id)

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        })
      }
    }
  }
}
