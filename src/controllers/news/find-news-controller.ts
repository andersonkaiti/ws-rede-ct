import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

const findAllNewsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().optional(),
  orderBy: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findAllNewsSchema.safeParse({
        page: req.query.page,
        limit: req.query.limit,
        title: req.query.title,
        content: req.query.content,
        author_id: req.query.author_id,
        order_by: req.query.order_by,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const {
        page,
        limit,
        authorId,
        content,
        orderBy = 'desc',
        title,
      } = parseResult.data

      const offset = limit * page - limit

      const [news, totalNews] = await Promise.all([
        this.newsRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter: {
            authorId,
            content,
            title,
            orderBy,
          },
        }),

        this.newsRepository.count({
          filter: {
            title,
            content,
            authorId,
          },
        }),
      ])

      const totalPages = Math.min(Math.ceil(totalNews / limit), 1)

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
