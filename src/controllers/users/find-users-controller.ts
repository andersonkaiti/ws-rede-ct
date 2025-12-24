import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findUsersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
  name: z.string().optional(),
  emailAddress: z.string().optional(),
  phone: z.string().optional(),
  lattesUrl: z.string().optional(),
  orcid: z.string().optional(),
})

export class FindUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findUsersQuerySchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const users = await this.userRepository.find({
      pagination: {
        offset,
        limit,
      },
      filter,
    })

    const totalUsers = await this.userRepository.count({
      filter,
    })

    const totalPages = limit ? Math.max(Math.ceil(totalUsers / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      users,
    })
  }
}
