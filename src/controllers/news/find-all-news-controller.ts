import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

const findAllNewsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  content: z.string().optional(),
  author_id: z.string().optional(),
  order_by: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindAllNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        page,
        limit,
        author_id,
        content,
        order_by = 'desc',
        title,
      } = findAllNewsSchema.parse({
        page: req.query.page,
        limit: req.query.limit,

        title: req.query.title,
        content: req.query.content,
        author_id: req.query.author_id,
        order_by: req.query.order_by,
      })

      const offset = limit * page - limit

      const [news, totalNews] = await Promise.all([
        this.newsRepository.findAll({
          pagination: {
            offset,
            limit,
          },
          filter: {
            author_id,
            content,
            title,
            order_by,
          },
        }),

        this.newsRepository.count({
          filter: {
            title,
            content,
            author_id,
          },
        }),
      ])

      const totalPages = Math.ceil(totalNews / limit)

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
