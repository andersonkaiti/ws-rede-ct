import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

extendZodWithOpenApi(z)

export const findUsersQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
  name: z.string().optional(),
  emailAddress: z.string().optional(),
  phone: z.string().optional(),
  lattesUrl: z.string().optional(),
  orcid: z.string().optional(),
})

export class FindUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findUsersQuerySchema.parse(req.query)

      const hasPagination = page !== undefined && limit !== undefined

      const pagination = hasPagination
        ? {
            offset: (page - 1) * limit,
            limit,
          }
        : undefined

      const users = await this.userRepository.find({
        pagination,
        filter,
      })

      if (!hasPagination) {
        return res.status(HttpStatus.OK).json(users)
      }

      const totalUsers = await this.userRepository.count({
        filter,
      })

      const totalPages = Math.max(Math.ceil(totalUsers / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset: (page - 1) * limit,
        limit,
        users,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
