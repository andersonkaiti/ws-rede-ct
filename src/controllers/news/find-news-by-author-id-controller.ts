import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 7

const findByAuthorSchem = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

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
      const { page, limit, author_id, content, order_by, title } =
        findByAuthorSchem.parse({
          page: req.query.page,
          limit: req.query.limit,

          author_id: req.params.author_id,
          title: req.query.title,
          content: req.query.content,
          order_by: req.query.order_by,
        })

      const offset = page * limit - limit

      const [news, totalUserNews] = await Promise.all([
        this.newsRepository.findByAuthorId({
          author_id,
          pagination: {
            offset,
            limit,
          },
          filter: {
            order_by,
            title,
            content,
          },
        }),

        this.newsRepository.count({
          filter: {
            author_id,
            content,
            title,
          },
        }),
      ])

      const totalPages = Math.ceil(totalUserNews / limit)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        news,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
