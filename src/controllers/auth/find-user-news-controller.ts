import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 7

const findByAuthorSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  content: z.string().optional(),
  orderBy: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindAuthenticatedUserNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findByAuthorSchema.safeParse({
        page: req.query.page,
        limit: req.query.limit,
        title: req.query.title,
        content: req.query.content,
        order_by: req.query.order_by,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { page, limit, content, orderBy, title } = parseResult.data

      const offset = limit * page - limit

      const authenticatedUserId = req.user.id

      const [news, totalUserNews] = await Promise.all([
        this.newsRepository.findByAuthorId({
          authorId: authenticatedUserId,
          pagination: {
            offset,
            limit,
          },
          filter: {
            orderBy,
            title,
            content,
          },
        }),

        this.newsRepository.count({
          filter: {
            authorId: authenticatedUserId,
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
