import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IScientificJournalRepository } from '../../repositories/scientific-journal/iscientific-journal-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findScientificJournalsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  name: z.string().optional(),
  description: z.string().optional(),
  issn: z.string().optional(),
  directors: z.string().optional(),
  editorialBoard: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindScientificJournalsController {
  constructor(
    private readonly scientificJournalRepository: IScientificJournalRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } =
        findScientificJournalsControllerSchema.parse(req.query)

      const offset = page * limit - limit

      const [scientificJournals, totalScientificJournals] = await Promise.all([
        this.scientificJournalRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),

        this.scientificJournalRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalScientificJournals / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        scientificJournals,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
