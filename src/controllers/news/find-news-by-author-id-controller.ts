import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.ts'

const findByAuthorSchem = z.object({
  author_id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  order_by: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindByAuthorController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { author_id, content, order_by, title } = findByAuthorSchem.parse({
        author_id: req.params.author_id,
        title: req.query.title,
        content: req.query.content,
        order_by: req.query.order_by,
      })

      const news = await this.newsRepository.findByAuthorId({
        author_id,
        filter: {
          order_by,
          title,
          content,
        },
      })

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
